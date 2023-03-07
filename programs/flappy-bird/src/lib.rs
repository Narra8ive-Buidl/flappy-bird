use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount};

declare_id!("37ZT5GsJGt2hNHL5i2Txnijz3DfXKHYG34yVxc57uzKR");

#[program]
pub mod flappy_bird {
    use super::*;
    pub fn create_user_account(ctx: Context<CreateAccount>, user_name: String) -> Result<()> {
        require!(user_name.len() <= 20, GameError::UserNameTooLong);
        ctx.accounts.user_account.set_inner(UserDetails {
            user_name,
            level: 0,
            reward_earned: 0,
        });
        Ok(())
    }
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
        let user_account = &mut ctx.accounts.user_account;
        let exp_per_lvl = u64::MAX.checked_div(100).unwrap();
        user_account.reward_earned += amount;
        user_account.level = user_account.reward_earned.checked_div(exp_per_lvl).unwrap() as u8;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintReward<'info> {
    #[account(address = "".parse::<Pubkey>().unwrap() @ GameError::InvalidMintAuth)]
    pub mint_auth: Signer<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds=["user_account".as_bytes().as_ref(), user.key().as_ref()], bump)]
    pub user_account: Account<'info, UserDetails>,
    #[account(mut, address = "".parse::<Pubkey>().unwrap() @ GameError::InvalidRewardMint)]
    pub reward_mint: Account<'info, Mint>,
    #[account(init_if_needed, payer=user,
              associated_token::mint=reward_mint,
              associated_token::authority=user)]
    pub token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateAccount<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(init, payer=user, space=8+4+20+1+8,
              seeds=["user_account".as_bytes().as_ref(), user.key().as_ref()], bump)]
    pub user_account: Account<'info, UserDetails>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserDetails {
    // max allowed characters = 20
    pub user_name: String,
    pub level: u8,
    pub reward_earned: u64,
}

#[error_code]
pub enum GameError {
    #[msg("user name can have atmost 20 characters")]
    UserNameTooLong,
    #[msg("mint authority account passed is incorrect")]
    InvalidMintAuth,
    #[msg("reward mint account passed is incorrect")]
    InvalidRewardMint,
}
