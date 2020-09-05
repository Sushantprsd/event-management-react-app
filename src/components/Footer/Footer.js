import React from "react";
import classes from "./Footer.module.css";
import { FaFacebook,FaTwitter,FaInstagram,FaYoutube,FaGithub} from "react-icons/fa";

const Footer = (props) => {
    return (
        <div className={classes.Footer}>
            <section className={classes.SocialMediaLink}>
                <ul className={classes.MediaLinks}>
                    <li><FaFacebook size={32} /></li>
                    <li><FaTwitter size={32} /></li>
                    <li><FaInstagram size={32} /></li>
                    <li><FaYoutube size={32} /></li>
                    <li><FaGithub size={32} /></li>
                </ul>
            </section>
            <section className={classes.CopyRight}>
                <ul className={classes.LegalList}>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                    <li>© 2019 Copyright Nowrap Inc.</li>
                </ul>
            </section>
        </div>
    );
};

export default Footer;
