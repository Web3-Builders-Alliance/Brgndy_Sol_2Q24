use anchor_lang::prelude::*;

#[account]
pub struct VoterHistory {
    pub idea_for: u64,
    pub idea_against: u64,
    pub strategy_for: u64,
    pub strategy_against: u64,
    pub ask_for: u64,
    pub ask_against: u64,
}

impl Space for VoterHistory {
    const INIT_SPACE: usize = 16 * 6;
}
