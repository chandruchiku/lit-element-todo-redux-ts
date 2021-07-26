import { LitElement, html, css } from 'lit-element';

export class VideoChat extends LitElement {

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            font-size: calc(10px + 2vmin);
            color: #1a2b42;
            max-width: 960px;
            margin: 0 auto;
            text-align: center;
            background-color: burlywood
        }
    `;

    render() {
        return html`
          <h3>Chat</h3>
        `;
    }
}

customElements.define('video-chat', VideoChat);