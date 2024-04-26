function Viewer(props) {
    const {pdfUrl} = props;


    return (
        <iframe src={pdfUrl} />
    )
}

export default Viewer