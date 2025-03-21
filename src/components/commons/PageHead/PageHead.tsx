
interface PropsType {
    title?: string;
}

const PageHead = (props: PropsType) => {
    const { title = "SIAKAD UIKA" } = props

    return(
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/images/logo/uika-logo.jpg" type="image/x-icon" />
            <title>{title}</title>
        </head>
    )
}

export default PageHead;