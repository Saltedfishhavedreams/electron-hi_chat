import styled from 'styled-components'

export const TranslatePageWrapper = styled.div`
  .container {
    padding: 0 15px;
    width: 100%;
    .content-wrap {
      padding: 35px 25px 10px;
      height: 515px;
      background-color: #fff;
      border: 1px solid #dbdbdb;

      img {
        display: inline-flex;
        align-self: center;
        height: 20px;
        width: 40px;
        margin: 0 20px;
      }

      *::-webkit-scrollbar {
        width: 3px;
      }

      *::-webkit-scrollbar-thumb {
        background: rgba(20, 20, 20, 0.2);
        border-radius: 3px;
      }

      *::-webkit-scrollbar-track {
        background: transparent;
      }

      .top-select {
        display: flex;
        .ant-select {
          width: 60%;
        }
      }

      .translate-box-part {
        display: flex;
        margin-top: 30px;

        textarea {
          width: 58%;
        }
      }

      .translate-button {
        display: flex;
        justify-content: center;
        margin-top: 40px;

        button {
          width: 60%;
          color: #fff;
          border-color: transparent;
        }

        .translate-msg-button {
          margin-right: 36px;
          background-color: #909390;

          &:hover {
            background-color: #b2b4b2;
          }
        }

        .send-msg-button {
          margin-left: 36px;
          background-color: #019f00;

          &:hover {
            background-color: #149214;
          }
        }
      }

      .operation-part {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        div {
          color: #bbbbbb;
        }

        .left-part {
        }

        .right-part {
          display: flex;
          align-items: center;
          button {
            margin-left: 10px;
          }
        }
      }

      .bottom-history {
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        margin-top: 15px;
        padding: 8px;
        height: 160px;
        border: 1px #cacaca solid;
        overflow-y: auto;

        .ant-tag {
          margin: 4px;
          max-width: 99%;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
      }
    }
  }
`
