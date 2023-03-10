use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount};

declare_id!("E3KnktUoT56BnmmMRemi4yV3LLxtpEf5CaKYHBXtTeks");

#[program]
pub mod flappy_bird {
    use super::*;

    pub fn mint_reward(ctx: Context<MintReward>, amount: u64) -> Result<()> {
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(
            cpi_program,
            MintTo {
                mint: ctx.accounts.reward_mint.to_account_info(),
                to: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.mint_auth.to_account_info(),
            },
        );
        token::mint_to(cpi_context, amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintReward<'info> {
    #[account(address = "J3ZnRAYAEHyJMvf5H9r8cvykcQ5WD9hDgVx6Zf5u713n".parse::<Pubkey>().unwrap() @ GameError::InvalidMintAuth)]
    pub mint_auth: Signer<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, address = "BkG1tcC535nGSwaTY3RwvzdMwiVh8VTXmh7KQ189Jjye".parse::<Pubkey>().unwrap() @ GameError::InvalidRewardMint)]
    pub reward_mint: Account<'info, Mint>,
    #[account(init_if_needed, payer=user,
              associated_token::mint=reward_mint,
              associated_token::authority=user)]
    pub token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum GameError {
    #[msg("mint authority account passed is incorrect")]
    InvalidMintAuth,
    #[msg("reward mint account passed is incorrect")]
    InvalidRewardMint,
}
