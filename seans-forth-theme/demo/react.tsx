import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { Text } from 'styles/text'
import { theme } from 'theme'

type Props = React.ComponentProps<typeof StyledButton> &
  React.HTMLProps<HTMLButtonElement> & {
    variant?: keyof typeof theme.colors.button
    inline?: boolean
    loading?: boolean
  }

export const Button: React.FC<Props> = ({ children, variant, inline, disabled, loading, ...props }) => (
  <StyledButton $variant={variant} $inline={inline} {...props} disabled={disabled || loading}>
    <Content $loading={loading}>
      <Text as='span'>{children}</Text>
    </Content>

    {loading && (
      <LoadingDots>
        <LoadingDotsWrapper>
          <LoadingDot $delay={0} />
          <LoadingDot $delay={175} />
          <LoadingDot $delay={350} />
        </LoadingDotsWrapper>
      </LoadingDots>
    )}
  </StyledButton>
)

type ButtonProps = {
  $variant?: keyof Omit<typeof theme.colors.button, 'disabled' | 'loading'>
  $inline?: boolean
}

export const StyledButton = styled.button<ButtonProps>(({ theme, $variant = 'primary', $inline }) => {
  const inlineStyles = css`
    width: auto;
  `

  return css`
    position: relative;
    width: 100%;
    background: ${theme.colors.button[$variant].background};
    border-radius: ${theme.radii.regular};
    padding: ${theme.space.space12} ${theme.space.space40};
    border: ${theme.borders.default};
    border-color: transparent;
    text-align: center;

    :hover,
    :focus,
    :active {
      background: ${theme.colors.button[$variant].hover.background};
    }

    :disabled {
      background: ${theme.colors.button.disabled.background};
      pointer-events: none;

      ${Content} {
        opacity: 0.5;
      }
    }

    ${$inline && inlineStyles}
  `
})

type ContentProps = {
  $loading?: boolean
}

export const Content = styled.div<ContentProps>(({ theme, $loading }) => {
  const hiddenStyles = css`
    visibility: hidden;
  `

  return css`
    ${$loading && hiddenStyles}
  `
})

export const LoadingDots = styled.div(() => {
  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `
})

export const LoadingDotsWrapper = styled.div(({ theme }) => {
  return css`
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    align-self: center;
    grid-template-columns: repeat(3, auto);
    column-gap: ${theme.space.space8};
  `
})

const loadAnimation = keyframes`
    0% {
        transform: scaleY(0.6) translateY(0);
    }
    40% {
      transform: scaleY(0.8) translateY(0);
    }
    60% {
      transform: scaleY(1) translateY(0);
    }
    100% {
        transform: scaleY(1) translateY(-50%);
    }
`

type DotProps = {
  $delay: number
}

export const LoadingDot = styled.div<DotProps>(({ theme, $delay }) => {
  return css`
    width: ${theme.sizes.icon.tiny};
    height: ${theme.sizes.icon.tiny};
    background-color: ${theme.colors.button.loading.foreground};
    border-radius: ${theme.radii.circle};
    animation: ${loadAnimation} 300ms infinite alternate ease-out;
    animation-fill-mode: both;
    animation-delay: ${$delay}ms;
    transform-origin: bottom;
  `
})
