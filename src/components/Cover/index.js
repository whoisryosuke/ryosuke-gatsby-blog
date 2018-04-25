import React from "react";
import Img from "gatsby-image";

export default (props) => {
    return (
        <figure className="Cover">
            {props.image.childImageSharp ? (
                <Img sizes={props.image.childImageSharp.sizes} />
            ) : (
                    <img src={props.image.publicURL} className="static-image" />
                )}
        </figure>
    );
};