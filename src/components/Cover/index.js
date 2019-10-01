import React from "react";
import Img from "gatsby-image";

export default (props) => {
    return (
        <figure className="Cover">
            {props.image.childImageSharp ? (
                <Img fluid={props.image.childImageSharp.fluid} />
            ) : (
                    <img src={props.image.publicURL} className="static-image" />
                )}
        </figure>
    );
};