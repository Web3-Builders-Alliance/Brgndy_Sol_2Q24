use crate::error::FunderError;
use crate::state::{Config, VoterData};

use anchor_lang::prelude::*;
use anchor_spl::token::{transfer, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct Staking<'info> {
    #[account(mut)]
    pub voter: Signer<'info>,
    #[account(
        seeds = ["funder-dao".as_bytes(),
        config.platform_auth.as_ref(),
        config.platform_seed.to_le_bytes().as_ref()],
        bump = config.bump,
        )]
    pub config: Account<'info, Config>,
    #[account(
        constraint = platform_mint.key() == config.platform_mint)]
    pub platform_mint: Account<'info, Mint>,
    #[account(
        mut,
        token::mint = platform_mint,
        token::authority = voter,
    )]
    pub voter_ata: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = voter,
        seeds = [voter.key().as_ref(), config.key().as_ref()],
        token::mint = platform_mint,
        token::authority = config,
        bump,
    )]
    pub voter_staked_ata: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = voter,
        seeds = [voter_staked_ata.key().as_ref(), config.key().as_ref()],
        space = 8 + VoterData::INIT_SPACE,
        bump,
    )]
    pub voter_data: Account<'info, VoterData>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

impl<'info> Staking<'info> {
    pub fn stake(&mut self, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: self.voter_ata.to_account_info(),
            to: self.voter_staked_ata.to_account_info(),
            authority: self.voter.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), cpi_accounts);

        if self.voter_data.voter == self.voter.key() {
            match transfer(cpi_ctx, amount) {
                Ok(()) => self.voter_data.voting_power += amount,
                Err(e) => return Err(e),
            };
            Ok(())
        } else {
            self.voter_data.voter = self.voter.key();

            match transfer(cpi_ctx, amount) {
                Ok(()) => self.voter_data.voting_power = amount,
                Err(e) => return Err(e),
            };
            Ok(())
        }
    }
    pub fn start_unstaking(&mut self, amount: u64) -> Result<()> {
        require!(
            self.voter_data.is_unstaking == false
                && self.voter_data.unstaking_end_timestamp == None,
            FunderError::SecondUnstakingError
        );
        self.voter_data.voting_power -= amount;
        self.voter_data.unstaking_amount = Some(amount);
        self.voter_data.unstaking_end_timestamp =
            Some(Clock::get().unwrap().unix_timestamp + self.config.unstaking_period);

        Ok(())
    }

    pub fn unstake(&mut self) -> Result<()> {
        require!(
            self.voter_data.is_unstaking == true && self.voter_data.unstaking_end_timestamp != None,
            FunderError::NoUnstakingError
        );
        require!(
            Clock::get().unwrap().unix_timestamp
                >= self.voter_data.unstaking_end_timestamp.unwrap(),
            FunderError::StillUnstakingError
        );
        let cpi_accounts = Transfer {
            from: self.voter_staked_ata.to_account_info(),
            to: self.voter_ata.to_account_info(),
            authority: self.config.to_account_info(),
        };
        let config_seeds: &[&[&[u8]]] = &[&[
            b"funder-dao",
            self.config.platform_auth.as_ref(),
            &self.config.platform_seed.to_le_bytes()[..],
            &[self.config.bump],
        ]];

        let cpi_ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            cpi_accounts,
            config_seeds,
        );

        transfer(cpi_ctx, self.voter_data.unstaking_amount.unwrap())
    }
}
