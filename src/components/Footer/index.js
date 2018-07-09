import React from "react";

import Twitter from '../../components/icons/Twitter';
import Instagram from '../../components/icons/Instagram';
import Github from '../../components/icons/Github';
import Hashnode from '../../components/icons/Hashnode';
import Tumblr from '../../components/icons/Tumblr';
import Behance from '../../components/icons/Behance';

export default () => {
    return (
        <footer className="Footer">
            <nav className="copyright">
                <p>
                    Copyright &copy; 2018 Ryosuke Hana
                </p>
            </nav>
            <nav className="Navigation social">
                <ul>
                    <li>
                        <a href="http://twitter.com/whoisryosuke" className="icon twitter" title="Twitter">
                            <Twitter />
                        </a>
                    </li>
                    <li>
                        <a href="http://instagram.com/whoisryosuke" className="icon instagram" title="Instagram">
                            <Instagram />
                        </a>
                    </li>
                    <li>
                        <a href="http://github.com/whoisryosuke" className="icon github" title="Github">
                            <Github />
                        </a>
                    </li>
                    <li>
                        <a href="http://hashnode.com/@oscarthegrouch" className="icon hashnode" title="Hashnode">
                            <Hashnode />
                        </a>
                    </li>
                    <li>
                        <a href="http://whoisryosuke.tumblr.com/" className="icon tumblr" title="Tumblr">
                            <Tumblr />
                        </a>
                    </li>
                    <li>
                        <a href="http://behance.com/whoisryosuke" className="icon behance" title="Behance">
                            <Behance />
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};