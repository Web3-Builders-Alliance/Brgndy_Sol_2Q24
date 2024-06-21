use crate::state::{Config, VoterData, VoterHistory, VotingState};
use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

#[derive(Accounts)]
pub struct Voting<'info> {
    #[account(mut)]
    pub voter: Signer<'info>,
    #[account(
        seeds = ["funder-dao".as_bytes(),
        config.platform_auth.key().as_ref(),
        config.platform_seed.to_le_bytes().as_ref()],
        bump = config.bump,
        )]
    pub config: Account<'info, Config>,
    #[account(
        mut,
        seeds = [config.key().as_ref(),
        voting_state.project_maker.key().as_ref(),
        voting_state.project_name.as_str().as_bytes()],
        bump = voting_state.bump,
        )]
    pub voting_state: Account<'info, VotingState>,
    #[account(
        mut,
        seeds = [voter.key().as_ref(), config.key().as_ref()],
        bump,
    )]
    pub voter_staked_ata: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [voter_staked_ata.key().as_ref(), config.key().as_ref()],
        bump,
    )]
    pub voter_data: Account<'info, VoterData>,
    #[account(
        init,
        payer = voter,
        seeds = [voter_data.key().as_ref(), voting_state.key().as_ref()],
        space = 8 + VoterHistory::INIT_SPACE,
        bump,
        )]
    pub voter_history: Account<'info, VoterHistory>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

impl<'info> Voting<'info> {
    pub fn vote(&mut self, idea_for: bool, strategy_for: bool, ask_for: bool) -> Result<()> {
        let _idea_vote = match idea_for {
            true => {
                self.voting_state.idea_for += self.voter_data.voting_power;
                self.voter_history.ask_for = self.voter_data.voting_power;
            }
            false => {
                self.voting_state.idea_against += self.voter_data.voting_power;
                self.voter_history.ask_for = self.voter_data.voting_power;
            }
        };

        let _strategy_vote = match strategy_for {
            true => {
                self.voting_state.strategy_for += self.voter_data.voting_power;
                self.voter_history.strategy_for = self.voter_data.voting_power;
            }
            false => {
                self.voting_state.strategy_against += self.voter_data.voting_power;
                self.voter_history.strategy_against = self.voter_data.voting_power;
            }
        };

        let _ask_for = match ask_for {
            true => {
                self.voting_state.ask_for += self.voter_data.voting_power;
                self.voter_history.ask_for = self.voter_data.voting_power;
            }
            false => {
                self.voting_state.ask_against += self.voter_data.voting_power;
                self.voter_history.ask_against = self.voter_data.voting_power;
            }
        };

        Ok(())
    }
}
