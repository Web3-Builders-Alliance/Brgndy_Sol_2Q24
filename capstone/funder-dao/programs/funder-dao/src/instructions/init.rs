use crate::state::Config;
use anchor_lang::prelude::*;
use anchor_spl::token::Mint;

#[derive(Accounts)]
#[instruction(platform_seed: u64)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub platform_auth: Signer<'info>,
    #[account(
        init,
        payer = platform_auth,
        seeds = ["funder-dao".as_bytes(),
        platform_auth.key().as_ref(),
        platform_seed.to_le_bytes().as_ref()],
        bump,
        space = 8 + Config::INIT_SPACE,
        )]
    pub config: Account<'info, Config>,
    pub platform_mint: Account<'info, Mint>,
    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn init_platform(
        &mut self,
        platform_seed: u64,
        days_to_unstake: i64,
        bumps: &InitializeBumps,
    ) -> Result<()> {
        let seconds_to_unstake = days_to_unstake * 86400;
        self.config.set_inner(Config {
            platform_auth: self.platform_auth.key(),
            platform_mint: self.platform_mint.key(),
            unstaking_period: seconds_to_unstake,
            platform_seed,
            bump: bumps.config,
        });


        Ok(())
    }
}
