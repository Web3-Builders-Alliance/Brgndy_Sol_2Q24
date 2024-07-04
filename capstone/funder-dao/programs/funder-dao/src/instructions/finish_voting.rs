use crate::error::FunderError;
use crate::state::{Config, VotingState};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct FinishVoting<'info> {
    #[account(mut)]
    pub caller: Signer<'info>,
    #[account(
        seeds = ["funder-dao".as_bytes(),
        config.platform_auth.key().as_ref(),
        config.platform_seed.to_le_bytes().as_ref()],
        bump = config.bump,
        )]
    pub config: Account<'info, Config>,
    #[account(
        seeds = [config.key().as_ref(),
        voting_state.project_maker.key().as_ref(),
        voting_state.project_name.as_str().as_bytes()],
        bump = voting_state.bump
        )]
    pub voting_state: Account<'info, VotingState>,
    pub system_program: Program<'info, System>,
}

impl<'info> FinishVoting<'info> {
    pub fn finish(&mut self) -> Result<()> {
        require!(
            self.voting_state.voting_end <= Clock::get().unwrap().unix_timestamp,
            FunderError::VotingStillGoingError
        );
        if self.voting_state.idea_for > self.voting_state.idea_against
            && self.voting_state.strategy_for > self.voting_state.strategy_against
            && self.voting_state.ask_for > self.voting_state.ask_against
        {
            msg!("Congratulations! Your project passed the community voting and is ready to get onboarded");
        } else {
            if self.voting_state.idea_against >= self.voting_state.idea_for {
                msg!("Unfortunatelly, your project didn't pass the community voting, please rewise your idea");
            }

            if self.voting_state.strategy_against >= self.voting_state.strategy_for {
                msg!("Unfortunatelly, your project didn't pass the community voting, please rewise your strategy");
            }

            if self.voting_state.ask_against >= self.voting_state.ask_for {
                msg!("Unfortunatelly, your project didn't pass the community voting, please rewise your ask amount");
            }
        }
        Ok(())
    }
}
