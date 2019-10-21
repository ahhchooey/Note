import React from "react";
import {Link} from "react-router-dom";


export default class FrontPage extends React.Component {
  componentDidMount() {
    this.TESTIMONIALS = {
      business: "Wow this is so very original.",
      forbes: "Amazing, this site looks just like Netflix.",
      verge: "I'm out of things to say."
    }
    this.testimonyText = document.querySelector(".testimony-text");
    }

  changeTestimony(co) {
    this.testimonyText.innerHTML = this.TESTIMONIALS[co]
  }

  render() {
  return (
  <div className="front-page">

    <div className="impact">
      <div className="impact-text">
        <h2>Your notes.</h2>
        <h2>Organized.</h2>
        <h2>Effortless.</h2>
        <p>Take notes anywhere. Find information faster. Share ideas with anyone. Meeting notes, web pages, projects, to-do lists—with Note as your note taking app, nothing falls through the cracks.</p>
        <button onClick={() => this.props.history.push("/signup")} className="impact-button">Sign Up For Free</button>
      </div>
      <img src="https://evernote.com/c/assets/homepage/homepage-hero-desktop.png?3044bdd28d311821" alt="computer" />
    </div>

    <div className="focus">
      <img src="https://evernote.com/c/assets/homepage/homepage-focus.png?3b18f2f592336b85" alt="brain-cog" />
      <h2>Focus on what matters most</h2>
      <div className="focus-text">
        <p>Manage everything from big projects to personal moments.</p>
        <p>Capture ideas and inspiration in notes, voice, and pictures.</p>
        <p>Never lose track of your tasks and deadlines.</p>
      </div>
    </div>

    <div className="anywhere">
      <img src="https://evernote.com/c/assets/homepage/homepage-mask.png?eaa5bd538c862d5f" alt="stairs" />
      <div className="anywhere-text">
        <h2>At work, at home, and everywhere in between</h2>
        <p>Note’s plans and pricing are designed to fit your needs.</p>
      </div>
    </div>

    <div className="remember">
      <div className="remember-text">
        <h2>Remember everything important</h2>
        <p>A single place for your notes, ideas, lists and reminders.</p>
        <Link className="plan-link" to={"/basic"}>Note Basic →</Link>
      </div>
      <img src="https://evernote.com/c/assets/homepage/remember-everything-retina.png?bd3af3f51ccace7c" alt="brain" />
    </div>

    <div className="organize">
      <img src="https://evernote.com/c/assets/homepage/assets/multi-devices-retina.png?d26ac4e7ff95e4e8" alt="organize-computer" />
      <div className="organize-text">
        <h2>Stay organized, wherever you are</h2>
        <p>Plan, keep records, and manage projects from any device.</p>
        <Link className="plan-link" to={"/premium"}>Note Premium →</Link>
      </div>
    </div>

    {/*
    <div className="collaborate">
      <div className="collaborate-text">
        <h2>Collaborate with your team</h2>  
        <p>Manage projects, deadlines, clients, and meetings with ease.</p>
        <Link className="plan-link" to={"/business"}>Note Business →</Link>
      </div>
      <img src="https://evernote.com/c/assets/homepage/assets/empty_space_retina.png?944061dee891effd" alt="collaborate-heads" />
    </div>
    */}

    <div className="compare">
      <button className="compare-plans-button">Compare Note Plans</button>
    </div>

    <div className="testimony">
      <img src="https://evernote.com/c/assets/homepage/homepage-heart.png?fd55e7f1f2d8e103" alt="heart" />
      <div className="testimony-images">
        <img onClick={() => this.changeTestimony("business")} src="https://evernote.com/c/assets/homepage/business-active-black.png?c4ec4840257a7e96" alt="business.com" />
        <img onClick={() => this.changeTestimony("forbes")} src="https://evernote.com/c/assets/homepage/forbes-active-black.png?e08eaae056d6f53f" alt="forbes" />
        <img onClick={() => this.changeTestimony("verge")} src="https://evernote.com/c/assets/homepage/the-verge-active.png?a84877cffd41c40" alt="the verge" />
      </div>
      <p className="testimony-text">Click to see what people have said about Note.</p>
    </div>

    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="how-block">
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
      </div>
      <button onClick={() => this.props.history.push("/signup")} className="trial-button">Start Your Free Trial</button>
    </div>

    <div className="popular-features">
      <h2>Popular Features</h2>
      <div className="popular-links">
        <Link className="p-link" to={"features/webclipper"}>
          <img src="https://evernote.com/c/assets/homepage/web-clipping.png?78c1581dd1d6c3da" alt="web clipper" />
          <p>Web Clipper</p>
        </Link>
        <Link className="p-link" to={"features/multisync"}>
          <img src="https://evernote.com/c/assets/homepage/multi-device-sync.png?8803719a916b2f3f" alt="Muti-Device Sync" />
          <p>Multi-Device Sync</p>
        </Link>
        <Link className="p-link" to={"features/notebooks-and-tags"}>
          <img src="https://evernote.com/c/assets/homepage/notebooks-tags.png?e515072b2d881286" alt="notebooks and tags" />
          <p>Notebooks & Tags</p>
        </Link>
      </div>
    </div>

    <footer className="footer">
          <img className="logo" src="https://www.designfreelogoonline.com/wp-content/uploads/2017/07/000856-Wolf-head-logo-maker-01.png" alt="logo" />
      <div className="horizontal-divider"></div>
      <p>Wow there are so many things here.</p>
    </footer>

  </div>
)};
}


