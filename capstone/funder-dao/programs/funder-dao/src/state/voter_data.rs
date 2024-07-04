use anchor_lang::prelude::*;

#[account]
pub struct VoterData {
    pub voter: Pubkey,
    pub voting_power: u64,
    pub is_unstaking: bool,
    pub unstaking_end_timestamp: Option<i64>,
    pub unstaking_amount: Option<u64>,
    pub voter_staked_ata_bump: u8,
}

impl Space for VoterData {
    const INIT_SPACE: usize = 32 + 8 + 1 + 16 + 16;
}
