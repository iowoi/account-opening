import React, {Component} from 'react';

class PEP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCN: WEB_LANG('cn')
        }
    }

    render() {
        const {isCN} = this.state
        return (
            <div>
                <div className="white-wrap col-md-10 col-center ">
                    <h3>"Prescribed Person" means (in terms of NZX Participant Rules)</h3>
                    <p>
                        a) a Market Participant;
                        <br/><br/>
                        b) a director, a partner, a Managing Principal or Responsible Executive,
                        shareholder or Employee of a Market Participant ("the restricted group"),and
                        includes
                        <br/>
                        (i) any one of the restricted group acting under a discretion conferred by any
                        of the persons referred to in paragraphs (c) to (e);<br/>
                        (ii) any person over whom any one of the restricted group has influence for that
                        person’s investment decisions except in the ordinary course of a client advising
                        relationship; and
                        <br/>
                        (iii) any person where any one of the restricted group has a direct or indirect
                        beneficial interest in that person’s property;<br/><br/>
                        c) the Immediate Family of a person referred to in paragraphs (a) to (b);<br/><br/>
                        d) a Family Company and a Family Trust of a person referred to in paragraphs (a)
                        to (b); and<br/><br/>
                        e) where a Market Participant or a person referred to in paragraphs (a) to (b)
                        is a body corporate, any body corporate or other entity controlled by that body
                        corporate.
                    </p>
                </div>
                <div className="white-wrap col-md-10 col-center ">
                    <h3>"Politically Exposed Person" means</h3>
                    <p>
                    a)An individual who holds, or has held at any time in the preceding 12 months, in any country (apart from New Zealand) the prominent public function of—<br/>
                    (i) Head of State or head of a country or government; or<br/>
                    (ii) Government minister or equivalent senior politician; or<br/>
                    (iii) Supreme Court Judge or equivalent senior Judge; or<br/>
                    (iv) Governor of a central bank or any position that has comparable influence to the Governor of the Reserve Bank of New Zealand; or<br/>
                    (v) Senior foreign representative, ambassador, or high commissioner; or<br/>
                    (vi) High-ranking member of the armed forces; or<br/>
                    (vii) Board chair, chief executive, or chief financial officer of, or any other position that has comparable influence in, any State enterprise; and<br/><br/>
                    b) An immediate family member of a person referred to in paragraph (a), including—<br/>
                    (i) A spouse; or<br/>
                    (ii) A partner, being a person who is considered by the relevant national law as equivalent to a spouse; or<br/>
                    (iii) A child and a child's spouse or partner; or<br/>
                    (iv) A parent; and<br/><br/>
                    c) Having regard to information that is public or readily available,—<br/>
                    (i) Any individual who is known to have joint beneficial ownership of a legal entity or legal arrangement, or any other close relationship, with a person referred to in paragraph (a); or<br/>
                    (ii) Any individual who has sole beneficial ownership of a legal entity or legal arrangement that is known to exist for the benefit of a person described in paragraph (a)
                    </p>
                </div>
            </div>
        );
    }
}

export default PEP;