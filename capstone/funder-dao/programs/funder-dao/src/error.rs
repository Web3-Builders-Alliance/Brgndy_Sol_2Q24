use anchor_lang::prelude::*;

#[error_code]
pub enum FunderError {
    #[msg("Unstaking already started, cannot unstake twice!")]
    SecondUnstakingError,
    #[msg("Unstaking has not been started previously!")]
    NoUnstakingError,
    #[msg("Unstaking has not been finished yet!")]
    StillUnstakingError,
    #[msg("Voting still going!")]
    VotingStillGoingError,
    #[msg("Voting has been ended!")]
    VotingEndedError,
    #[msg("You don't have enough tokens to unstake!")]
    NotEnoughToUnstakeError,
}
