import styled from 'styled-components'

export const QuickReplyWrap = styled.div`
  .container-quickReply {
    padding: 0 15px;
    width: 100%;

    .content-wrap {
      position: relative;
      padding: 2% 0 0;
      background-color: #fff;
      border: 1px solid #dbdbdb;
      height: 340px;

      .info-item-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
        height: 17%;
        cursor: pointer;

        &:hover {
          background-color: #bbbbbb;
        }

        .info-item {
          height: 100%;
          max-width: 50%;
          div {
            display: flex;
            align-items: center;
            height: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .operation {
          button {
            background-color: transparent;
            border: none;
          }
        }
      }

      .ant-pagination {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 15%;
      }
    }

    .top-part {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      .left-part {
        display: flex;
        align-items: center;
        justify-content: center;

        .ant-select,
        .center-line {
          width: 80px;
        }

        .center-line {
          margin: 0 11px;
          border-bottom: 1px solid #bbbbbb;
        }
      }

      .right-part {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #019f00;
        cursor: pointer;

        .anticon-file-add {
          margin-right: 5px;
          svg {
            width: 22px;
            height: 20px;
          }
        }
      }
    }

    .send-msg-button {
      margin-top: 30px;
      float: right;
      width: 80px;
      text-align: center;
    }
  }

  .modal-left-part {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .ant-select,
    .center-line {
      width: 80px;
    }

    .center-line {
      margin: 0 11px;
      border-bottom: 1px solid #bbbbbb;
    }
  }

  .modal-text-input {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    textarea {
      width: 44%;
    }
  }

  .modal-operation-button {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    margin-top: 35px;

    button {
      width: 35%;
      border-radius: 3px;
    }
  }

  .active {
    background-color: #bbbbbb !important;
  }
`
