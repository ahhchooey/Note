import React from "react";
import {Link} from "react-router-dom";


const FrontPage = (props) => (
  <div className="front-page">

    <div className="impact">
      <h2>Your notes.</h2>
      <h2>Organized.</h2>
      <h2>Effortless.</h2>
      <p>Take notes anywhere. Find information faster. Share ideas with anyone. Meeting notes, web pages, projects, to-do lists—with Note as your note taking app, nothing falls through the cracks.</p>
      <button className="impact-button">Sign Up For Free</button>
    </div>

    <div className="focus">
      <img src="https://evernote.com/c/assets/homepage/homepage-focus.png?3b18f2f592336b85" alt="brain-cog" />
      <h2>Focus on what matters most</h2>
      <div>
        <p>Manage everything from big projects to personal moments.</p>
        <p>Capture ideas and inspiration in notes, voice, and pictures.</p>
        <p>Never lose track of your tasks and deadlines.</p>
      </div>
    </div>

    <div className="anywhere">
      <img src="https://evernote.com/c/assets/homepage/homepage-mask.png?eaa5bd538c862d5f" alt="stairs" />
      <h2>At work, at home, and everywhere in between</h2>
      <p>Note’s plans and pricing are designed to fit your needs.</p>
    </div>

    <div className="remember">
      <h2>Remember everything important</h2>
      <p>A single place for your notes, ideas, lists and reminders.</p>
      <Link to={"/basic"}>Note Basic -></Link>
      <img src="https://evernote.com/c/assets/homepage/remember-everything-retina.png?bd3af3f51ccace7c" alt="brain" />
    </div>

    <div className="organize">
      <img src="https://evernote.com/c/assets/homepage/assets/multi-devices-retina.png?d26ac4e7ff95e4e8" alt="organize-computer" />
      <h2>Stay organized, wherever you are</h2>
      <p>Plan, keep records, and manage projects from any device–even offline.</p>
      <Link to={"/premium"}>Note Premium -></Link>
    </div>

    <div className="collaborate">
      <h2>Collaborate with your team</h2>  
      <p>Manage projects, deadlines, clients, and meetings with ease.</p>
      <Link to={"/business"}>Note Business -></Link>
      <img src="https://evernote.com/c/assets/homepage/assets/empty_space_retina.png?944061dee891effd" alt="collaborate-heads" />
      <button className="compare-plans-button">Compare Note Plans</button>
    </div>

    <div className="testimony">
      <img src="https://evernote.com/c/assets/homepage/homepage-heart.png?fd55e7f1f2d8e103" alt="heart" />
      <div>
        <img src="https://evernote.com/c/assets/homepage/business-active-black.png?c4ec4840257a7e96" alt="business.com" />
        <img src="https://evernote.com/c/assets/homepage/the-verge-active.png?a84877cffd41c40" alt="the verge" />
        <img src="https://evernote.com/c/assets/homepage/forbes-active-black.png?e08eaae056d6f53f" alt="forbes" />
      </div>
      <p className="testimony-text">Placeholder Text</p>
    </div>

    <div className="how-it-works">
      <h2>How It Works</h2>
      <div>
        <img src="https://evernote.com/c/assets/homepage/sign-up-retina.png?22672455ed018695" alt="elephant" />
        <h3>Sign Up</h3>
        <p>Create your free account and choose the plan that fits your needs.</p>
      </div>
      <div>
        <img src="https://evernote.com/c/assets/homepage/add-content-retina.png?1d3b271d8639416f" alt="add-content" />
        <h3>Add Content</h3>
        <p>Type notes, add attachments, clip web pages, or record memos. All in one place.</p>
      </div>
      <div>
        <img src="https://evernote.com/c/assets/homepage/find-everything-retina.png?55f18594275500a4" alt="magnifying glass" />
        <h3>Find Everything</h3>
        <p>Organize your notes, your way. Use notebooks, tags, or our powerful search to find everything you need quickly.</p>
      </div>
      <div>
        <img src="https://evernote.com/c/assets/homepage/get-things-done-retina.png?79dc5a829cbc65d7" alt="checkbox" />
        <h3>Get Things Done</h3>
        <p>Manage projects, take meeting notes, set reminders, and edit documents.</p>
      </div>
      <button className="trial-button">Start Your Free Trial</button>
    </div>

    <div className="popular-features">
      <Link to={"features/webclipper"}>
        <img src="https://evernote.com/c/assets/homepage/web-clipping.png?78c1581dd1d6c3da" alt="web clipper" />
        <p>Web Clipper</p>
      </Link>
      <Link to={"features/multisync"}>
        <img src="https://evernote.com/c/assets/homepage/multi-device-sync.png?8803719a916b2f3f" alt="Muti-Device Sync" />
        <p>Multi-Device Sync</p>
      </Link>
      <Link to={"features/notebooks-and-tags"}>
        <img src="https://evernote.com/c/assets/homepage/notebooks-tags.png?e515072b2d881286" alt="notebooks and tags" />
        <p>Notebooks & Tags</p>
      </Link>
    </div>

    <footer className="footer">
      <div>placeholder for logo</div>  
      <div className="horizontal-divider"></div>
      <p>Placeholder Footer</p>
    </footer>

  </div>
)

export default FrontPage;
