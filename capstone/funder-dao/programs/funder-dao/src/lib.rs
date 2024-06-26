pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("82WtAv6MYbr18mKCPCgjrDzCYgqPVr1bdSQdXzfgweB1");

#[program]
pub mod funder_dao {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        platform_seed: u64,
        days_to_unstake: i64,
    ) -> Result<()> {
        ctx.accounts
            .init_platform(platform_seed, days_to_unstake, &ctx.bumps)
    }

    pub fn create_voting(
        ctx: Context<CreateVoting>,
        project_name: String,
        voting_end: i64,
    ) -> Result<()> {
        ctx.accounts
            .create_voting(project_name, voting_end, &ctx.bumps)
    }

    pub fn stake(ctx: Context<Staking>, amount: u64) -> Result<()> {
        ctx.accounts.stake(amount)
    }

    pub fn start_unstaking(ctx: Context<Staking>, amount: u64) -> Result<()> {
        ctx.accounts.start_unstaking(amount)
    }

    pub fn unstake(ctx: Context<Staking>) -> Result<()> {
        ctx.accounts.unstake()
    }
}
