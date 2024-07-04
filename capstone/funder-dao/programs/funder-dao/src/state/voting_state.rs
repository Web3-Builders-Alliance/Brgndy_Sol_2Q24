use anchor_lang::prelude::*;

#[account]
pub struct VotingState {
    pub project_maker: Pubkey,
    pub project_name: String,
    pub idea_for: u64,
    pub idea_against: u64,
    pub strategy_for: u64,
    pub strategy_against: u64,
    pub ask_for: u64,
    pub ask_against: u64,
    pub voting_start: i64,
    pub voting_end: i64,
    pub bump: u8,
}

impl Space for VotingState {
    const INIT_SPACE: usize = 32 + 32 + 8 * 8 + 1;
}
