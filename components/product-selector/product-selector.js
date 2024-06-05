import { getLibs } from '../../scripts/utils.js';
import { isEmptyObject } from '../../utils/utils.js';
import { style } from './product-selector.css.js';

const { LitElement, html, nothing } = await import(`${getLibs()}/deps/lit-all.min.js`);

export default class ProductSelector extends LitElement {
  static properties = {
    products: { type: Array },
    selectedProduct: { type: Object },
    caasTags: { type: Object },
    showBladeCheck: { type: Boolean },
  };

  static styles = style;

  handleSelectChange(event) {
    const productName = event.target.value;
    this.selectedProduct = {
      ...this.selectedProduct,
      ...this.products.find((product) => product.name === productName),
      ...this.caasTags[productName],
      isPlaceholder: false,
    };

    this.dispatchEvent(new CustomEvent('update-product', {
      detail: { product: this.selectedProduct },
      bubbles: true,
      composed: true,
    }));

    this.requestUpdate();
  }

  handleCheckChange(event) {
    const showProductBlade = event.target.checked;
    this.selectedProduct = {
      ...this.selectedProduct,
      showProductBlade,
    };

    this.dispatchEvent(new CustomEvent('update-product', {
      detail: { product: this.selectedProduct },
      bubbles: true,
      composed: true,
    }));

    this.requestUpdate();
  }

  isValidSelection() {
    return !this.selectedProduct.isPlaceholder && !isEmptyObject(this.selectedProduct);
  }

  render() {
    return html`
      <fieldset class="rsvp-field-wrapper">
      ${html`<img class="product-img" src="${this.selectedProduct.tagImage || '/icons/icon-placeholder.svg'}" alt="${this.selectedProduct.title || nothing}">`}  
        <sp-picker class="product-select-input" label="Select a product" value=${this.selectedProduct.name || nothing} @change="${this.handleSelectChange}">
          ${this.products.map((product) => html`<sp-menu-item value="${product.name}">${this.caasTags[product.name].title}
          </sp-menu-item>`)}
        </sp-picker>
        ${html`<sp-checkbox class="checkbox-product-link" .checked=${this.selectedProduct.showProductBlade} .disabled=${!this.isValidSelection() || !(this.showBladeCheck || this.selectedProduct.showProductBlade)} @change="${this.handleCheckChange}">Show ${this.selectedProduct.title || '[Product name]'} product blade on event details page</sp-checkbox>`}
        <slot name="delete-btn"></slot>
      </fieldset>
    `;
  }
}
