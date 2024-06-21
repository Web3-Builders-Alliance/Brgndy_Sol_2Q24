use anchor_lang::prelude::*;

#[account]
pub struct Config {
    pub platform_auth: Pubkey,
    pub platform_mint: Pubkey,
    pub platform_seed: u64,
    pub unstaking_period: i64,
    pub bump: u8,
}

impl Space for Config {
    const INIT_SPACE: usize = 32 + 32 + 16 + 8 + 1;
}
