import styled from 'styled-components'

export const TranslateSettingsWrap = styled.div`
  .container {
    padding: 0 15px;
    width: 100%;

    .content-wrap {
      padding: 0 20px;
      height: 250px;
      background-color: #fff;
      border: 1px solid #dbdbdb;

      .top-title {
        height: 60px;
        line-height: 60px;
        color: #968699;
        border-bottom: 1px solid #bbbbbb;
      }

      .text {
        margin: 0 30px 0 0;
      }

      .wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 300px;
      }

      .auto-translate-switch {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 55px;
      }

      .otherParty-language-check {
        display: flex;
        align-items: center;
        justify-content: center;
        .ant-select {
          width: 170px;
        }
      }
    }
  }
`
