import { LitElement, html } from 'lit-element';

export class VideoController extends LitElement {

    render() {
        return html`
          <h3>Controls</h3>
        `;
    }
}

customElements.define('video-controller', VideoController);