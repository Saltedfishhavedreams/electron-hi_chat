import styled from 'styled-components'

export const UserInfoContentWrap = styled.div`
  padding: 20px 30px 0;
  height: 100%;

  .init-style {
    margin-top: 20px;
    padding: 0 25px;
    height: 19%;
    background-color: #ffffff;
  }

  .header-portrait {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;

    img {
      width: 76px;
      height: 78px;
    }
  }

  .account-information,
  .time-info {
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50%;

      &.account-number,
      &.registration-time {
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }

  .surplus {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
  }

  .logout-btn {
    margin-top: 20px;
    width: 100%;
    height: 45px;
    background-color: #019f00;
    color: #fff;
    border: none;
    border-radius: 4%;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: #1dad1d;
    }
  }
`
