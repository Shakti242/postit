declare global {
    namespace JSX {
        interface IntrinsicElements {
            'lr-config': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { pubkey: string };
            'lr-file-uploader-regular': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
