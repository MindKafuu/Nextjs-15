import styled from "styled-components";

export const HomePageContainer = styled.div`
  flex-direction: column;
  // height: calc(100vh - 66px);
  background: #f6f7f9;
  margin-left: 10%;
  margin-right: 10%;

  .site {
    margin-top: 1rem;
    display: grid;
    grid-template-areas:
      "main main right-sidebar"
      "main main .";
    gap: 1rem;
    padding: 0 1rem 1rem 1rem;
    grid-template-columns: 150px 1fr;
  }

  @media (min-width: 1178px) and (max-width: 1500px) {
    margin-left: 5&;
    margin-right: 5%;

    .right-sidebar {
      width: 24rem !important;
    }
  }

  @media (max-width: 1178px) {
    margin-left: 0;
    margin-right: 0;
    .site {
      grid-template-columns: minmax(auto, 250px) minmax(250px, 1fr) minmax(
          auto,
          250px
        );
      grid-template-rows: min-content 1fr min-content;
      grid-template-areas:
        ". . ."
        "main main main"
        "right-sidebar right-sidebar right-sidebar";
      padding: 0;
    }

    .right-sidebar {
      bottom: 0;
      display: block !important;
      position: fixed;
      background-color: #fff;
      width: 100% !important;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    main {
      max-height: calc(100vh - 415px);
      overflow-y: auto;
    }

    .text-product-name {
      max-width: 300px !important;
    }
  }

  .right-sidebar {
    grid-area: right-sidebar;
    background-color: #fff;
    width: 26.25rem;
  }

  main {
    grid-area: main;
    height: calc(100vh - 105px);
    background: #f6f7f9;
    max-width: 100%;
  }

  .input-text {
    border: 1px solid #fff;
    border-radius: 8px;
    width: 3.5rem;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #344054;
  }

  .text-product-name {
    margin-left: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 410px;
    line-height: 1.2em;
    height: 2.4em;
  }

  .campaignBtn {
    border-radius: 1rem;
    border-width: 2px;
    border-color: #2c2c2c;
    color: #2c2c2c;
  }

  .campaignBtn {
    border-radius: 1rem;
    border-width: 2px;
    border-color: #2c2c2c;
    color: #2c2c2c;
    background: white;
  }

  .disCampaignBtn {
    border-radius: 1rem;
    border-width: 1px;
    border-color: #e4e7ec;
    color: #98a2b3;
    background: #e4e7ec;
  }
`;
