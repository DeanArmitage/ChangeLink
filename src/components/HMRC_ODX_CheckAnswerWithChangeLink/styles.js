import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0;
    .govuk-summary-list {
      display: table;
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
    }
    .govuk-summary-list {
      margin-bottom: 30px;
    }
    .govuk-summary-list {
      display: table;
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
    }
    .govuk-summary-list {
      font-size: 19px;
      font-size: 1.1875rem;
      line-height: 1.3157894737;
    }
    .govuk-summary-list {
      font-family: 'GDS Transport', arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-weight: 400;
      font-size: 16px;
      font-size: 1rem;
      line-height: 1.25;
      color: #0b0c0c;
      margin: 0;
      margin-bottom: 0px;
      margin-bottom: 20px;
    }

    .govuk-summary-list__row {
      display: table-row;
    }
    .govuk-summary-list__row {
      border-bottom: 1px solid #b1b4b6;
    }

    .govuk-summary-list__key {
      width: 30%;
    }
    .govuk-summary-list__key {
      margin-bottom: 5px;
      font-weight: 700;
    }
    .govuk-summary-list__key,
    .govuk-summary-list__value {
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .govuk-summary-list__key,
    .govuk-summary-list__value,
    .govuk-summary-list__actions {
      display: table-cell;
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
    }
    .govuk-summary-list__key,
    .govuk-summary-list__value,
    .govuk-summary-list__actions {
      margin: 0;
      margin-bottom: 0px;
    }

    .govuk-summary-list__row:not(.govuk-summary-list__row--no-actions) > :last-child {
      padding-right: 0;
    }
    .govuk-summary-list__actions {
      width: 20%;
      padding-right: 0;
      text-align: right;
    }
    .govuk-summary-list__actions {
      margin-bottom: 15px;
    }

    .app-prose-scope a:link,
    .govuk-link:link {
      color: #1d70b8;
    }
    .app-prose-scope a,
    .govuk-link {
      font-family: 'GDS Transport', arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-decoration: underline;
      text-decoration-thickness: auto;
      text-decoration-thickness: max(1px, 0.0625rem);
      text-underline-offset: 0.1578em;
    }
    .govuk-visually-hidden {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      clip: rect(0 0 0 0) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
      border: 0 !important;
      white-space: nowrap !important;
    }
  `;
});
