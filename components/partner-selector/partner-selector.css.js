/* stylelint-disable selector-class-pattern */
import { getLibs } from '../../scripts/utils.js';

const { css } = await import(`${getLibs()}/deps/lit-all.min.js`);

// eslint-disable-next-line import/prefer-default-export
export const style = css`
fieldset {
  margin-bottom: 32px;
  border: none;
  padding: 0;
}

.rsvp-field-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.rsvp-field-wrapper img.partner-img {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: contain;
}
`;
