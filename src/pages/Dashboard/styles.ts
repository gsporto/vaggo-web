import styled from 'styled-components';

export const Container = styled.div`
  main {
    display: grid;
    grid-template-columns: 1fr;
    margin: 3.2rem auto;
    width: 80%;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  background-color: #1c56ac;
  height: 275px;

  nav {
    text-align: center;
    color: #fff;
    font-size: 32px;
    font-weight: 700;
  }

  form {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    margin: 3.2rem auto;
    width: 80%;

    position: relative;
    menu {
      display: flex;

      strong {
        flex: 2;
        font-weight: 700;
        font-size: 3em;
        color: #fff;
      }

      button {
        flex: 1;
        background: #fff;
        color: #1c56ac;
        margin-left: 10px;
      }
    }

    > div {
      position: absolute;
      top: 160px;
    }
  }
`;

export const CandidateItens = styled.article`
  background: #fff;
  border: 1px solid #e6e6f0;
  border-radius: 0.8rem;
  margin-top: 2.4rem;
  overflow: hidden;

  header {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fafafc;
    border-bottom: 1px solid #e6e6f0;

    strong {
      font-size: 42px;
      font-weight: 300;
    }

    div {
      display: flex;

      span {
        background: #1c56ac;
        color: #fff;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
      }
    }
  }

  section {
    padding: 0 2rem;
    font-size: 1.6rem;
    line-height: 2.8rem;
    margin: 1rem 0;

    p {
      svg {
        margin-right: 10px;
      }
    }
  }

  footer {
    padding: 1rem 2rem;
    background: #fafafc;
    border-top: 1px solid #e6e6f0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      align-items: center;
      margin-top: 0;
      margin: 0 5px;
      div {
        flex: 1;
        svg {
          margin-right: 15px;
        }
      }

      p {
        flex: 2;
      }

      width: 10rem;
    }
  }
`;
