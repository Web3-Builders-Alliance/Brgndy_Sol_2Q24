use crate::state::{Config, VotingState};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(project_name: String)]
pub struct CreateVoting<'info> {
    #[account(mut)]
    pub project_maker: Signer<'info>,
    #[account(
        seeds = ["funder-dao".as_bytes(),
        config.platform_auth.key().as_ref(),
        config.platform_seed.to_le_bytes().as_ref()],
        bump = config.bump,
        )]
    pub config: Account<'info, Config>,
    #[account(
        init,
        payer = project_maker,
        seeds = [config.key().as_ref(),
        project_maker.key().as_ref(),
        project_name.as_str().as_bytes()],
        space = 8 + VotingState::INIT_SPACE,
        bump,
        )]
    pub voting_state: Account<'info, VotingState>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateVoting<'info> {
    pub fn create_voting(
        &mut self,
        project_name: String,
        voting_end: i64,
        bumps: &CreateVotingBumps,
    ) -> Result<()> {
        self.voting_state.set_inner(VotingState {
            project_maker: self.project_maker.key(),
            project_name,
            idea_for: 0,
            idea_against: 0,
            strategy_for: 0,
            strategy_against: 0,
            ask_for: 0,
            ask_against: 0,
            voting_start: Clock::get().unwrap().unix_timestamp,
            voting_end,
            bump: bumps.voting_state,
        });
        Ok(())
    }
}
