import styled from 'styled-components'

export const UpdateContentWrap = styled.div`
  padding: 0 23px;
  background-color: #fff;
  overflow: hidden;

  .top-title {
    height: 40px;
    line-height: 40px;
    font-weight: 700;
    font-size: 17px;
  }

  .bottom-operation {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    button {
      width: 170px;
    }
  }

  .ant-list {
    margin-top: 10px;
    max-height: 80px;
    overflow-y: auto;
  }
`
