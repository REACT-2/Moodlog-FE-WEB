import styled from 'styled-components'

export const Button = styled.div`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 100%;
    height: 100%;
  }
`
