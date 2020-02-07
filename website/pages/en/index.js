// vim:sw=2:et:
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const BlogSidebar = require('../../core/BlogSidebar.js');

class HomeHero extends React.Component {
  render() {
    return (
      <div id='hero'>
        <div id='hero-pipeline-webinar' className='container'>
          <div className='text'>
            <h1>Streaming Pipelines</h1>
            <h2>A webinar on using RabbitMQ and Project Reactor</h2>
            <h2>Feb 13 | <a href="https://content.pivotal.io/rabbitmq/feb-13-how-to-build-reliable-streaming-pipelines-with-rabbitmq-and-project-reactor-webinar?utm_campaign=reactor-streaming-webinar-banner&amp;utm_source=rabbitmq&amp;utm_medium=website">Register today</a></h2>
          </div>
        </div>
      </div>
    );
  }
}

class Intro extends React.Component {
  render() {
    const script1 = {__html: "window._ufHubConfig = window._ufHubConfig || [];window._ufHubConfig.push({'containers':{'app':'#UfEmbeddedHub1501190831892'},'collection':'453624','openLink':function(url){window.open(url);},'lazyloader':{'itemDisplayLimit':3,'maxTilesPerRow':3,'maxItemsTotal':3},'tileSize':'small','enablePageTracking':false,'baseUrl':'https://content.pivotal.io/','filesUrl':'https://content.cdntwrk.com/','generatedAtUTC':'2017-07-27 21:26:47'});"};
    const script2 = {__html: "(function(d,t,u){function load(){var s=d.createElement(t);s.src=u;d.body.appendChild(s);}if(window.addEventListener){window.addEventListener('load',load,false);}else if(window.attachEvent){window.attachEvent('onload',load);}else{window.onload=load;}}(document,'script','https://content.pivotal.io/hubsFront/embed_collection'));"};

    var blogSidebarConfig = this.props.config;
    blogSidebarConfig.blogSidebarTitle = {default: 'Updates'};
    blogSidebarConfig.blogSidebarCount = 5;

    return (
      <div id='intro'>
        <div id='description'>
          <h1>RabbitMQ is the most widely deployed open source message broker.</h1>
          <p>
            With tens of thousands of users, RabbitMQ is one of the most popular open source message brokers. From <a href="https://www.youtube.com/watch?v=1qcTu2QUtrU">T-Mobile</a>
            to <a href="https://medium.com/@runtastic/messagebus-handling-dead-letters-in-rabbitmq-using-a-dead-letter-exchange-f070699b952b">Runtastic</a>, RabbitMQ is used worldwide at small startups and large enterprises.
          </p>
          <p>
            RabbitMQ is lightweight and easy to deploy on premises
            and in the cloud. It supports multiple messaging
            protocols. RabbitMQ can be deployed in distributed and
            federated configurations to meet high-scale,
            high-availability requirements.
          </p>
          <p>
            RabbitMQ runs on many operating systems and cloud
            environments, and provides a <a href="/devtools.html">wide range of developer
            tools for most popular languages</a>.
          </p>
          <p>
            See how other people are using RabbitMQ:
          </p>
          <div id="UfEmbeddedHub1501190831892"></div>
          <script dangerouslySetInnerHTML={script1}></script>
          <script dangerouslySetInnerHTML={script2}></script>
          <p id='morelinkafterufembed'><a href='https://content.pivotal.io/rabbitmq'>More <span className="arrow"></span></a></p>
        </div>
        <div id='news'>
          <div id='updates'>
            <BlogSidebar
              language="en"
              config={blogSidebarConfig}
            />
            <p><a href='/blog/'>More updates<span className='arrow'></span></a></p>
          </div>
          <div id='twitterfeed'>
            <h2>Tweets</h2>
            <a className="twitter-timeline" href="https://twitter.com/RabbitMQ" data-chrome="noheader nofooter noborders transparent noscrollbar" data-tweet-limit='2'></a>
            <script src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
            <p><a href='https://twitter.com/RabbitMQ'>More tweets<span className='arrow'></span></a></p>
          </div>
        </div>
      </div>
    );
  }
}

class Features extends React.Component {
  render() {
    return (
      <div id='features' className='home-section-container'>
        <div className='home-section'>
          <h1>RabbitMQ Features</h1>
          <div className='tiles'>
            <div className='tile'>
              <img src="/img/features/messaging.svg" alt="Asynchronous Messaging" title="Asynchronous Messaging" />
              <h2>Asynchronous Messaging</h2>
              <p>
                Supports <a href='/protocols.html'>multiple messaging protocols</a>, <a href='/tutorials/tutorial-two-python.html'>message queuing</a>, <a href='/reliability.html'>delivery acknowledgement</a>, <a href='/tutorials/tutorial-four-python.html'>flexible routing to queues</a>, <a href='/tutorials/amqp-concepts.html'>multiple exchange type</a>.
              </p>
            </div>
            <div className='tile'>
              <img src="/img/features/monitor.svg" alt="Developer Experience" title="Developer Experience" />
              <h2>Developer Experience</h2>
              <p>
                Deploy with <a href='/download.html'>BOSH, Chef, Docker and Puppet</a>. Develop cross-language messaging with favorite programming languages such as: Java, .NET, PHP, Python, JavaScript, Ruby, Go, <a href='/devtools.html'>and many others</a>.
              </p>
            </div>
            <div className='tile'>
              <img src="/img/features/network.svg" alt="Distributed Deployment" title="Distributed Deployment" />
              <h2>Distributed Deployment</h2>
              <p>
                Deploy as <a href='/clustering.html'>clusters</a> for high availability and throughput; <a href='/federation.html'>federate</a> across multiple availability zones and regions.
              </p>
            </div>
            <div className='tile'>
              <img src="/img/features/clouds.svg" alt="Enterprise &amp; Cloud Ready" title="Enterprise &amp; Cloud Ready" />
              <h2>Enterprise &amp; Cloud Ready</h2>
              <p>
                Pluggable <a href='/authentication.html'>authentication</a>, <a href='/access-control.html'>authorisation</a>, supports <a href='/ssl.html'>TLS</a> and <a href='/ldap.html'>LDAP</a>. Lightweight and easy to deploy in public and private clouds.
              </p>
            </div>
            <div className='tile'>
              <img src="/img/features/tools.svg" alt="Tools &amp; Plugins" title="Tools &amp; Plugins" />
              <h2>Tools &amp; Plugins</h2>
              <p>
                Diverse array of <a href='/devtools.html'>tools and plugins</a> supporting continuous integration, operational metrics, and integration to other enterprise systems. Flexible <a href='/plugins.html'>plug-in approach</a> for extending RabbitMQ functionality.
              </p>
            </div>
            <div className='tile'>
              <img src="/img/features/gauge.svg" alt="Management &amp; Monitoring" title="Management &amp; Monitoring" />
              <h2>Management &amp; Monitoring</h2>
              <p>
                HTTP-API, command line tool, and UI for <a href='/management.html'>managing and monitoring</a> RabbitMQ.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class GetStarted extends React.Component {
  render() {
    return (
      <div id='getstarted' className='home-section-container'>
        <div className='home-section'>
          <h1>Get Started</h1>
          <div className='tiles'>
            <div className='tile'>
              <a className='btn btn-secondary' href='/download.html'>Download + Installation</a>
              <p>Servers and clients for popular operating systems and languages</p>
            </div>
            <div className='tile'>
              <a className='btn btn-primary' href='/getstarted.html'>RabbitMQ Tutorials</a>
              <p>Hands-on examples to get you started with RabbitMQ</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Support extends React.Component {
  render() {
    return (
      <div id='support' className='home-section-container'>
        <div className='home-section'>
          <h1>RabbitMQ Commercial Services</h1>
          <div id='commercial-items'>
            <img src="/img/commercial/commercial-distribution-phone.svg" id='commercial-distribution-phone' />
            <h2>Commercial Distribution</h2>
            <p>
              Pivotal Software offers a <a href="https://pivotal.io/rabbitmq">range of commercial offerings for RabbitMQ</a>. This includes a distribution called <a href="https://network.pivotal.io/products/pivotal-rabbitmq">Pivotal RabbitMQ</a>, a version that deploys in <a href="https://pivotal.io/platform/services-marketplace/messaging-and-integration/rabbitmq">Pivotal Platform</a>, and a forthcoming <a href="https://content.pivotal.io/blog/introducing-rabbitmq-for-kubernetes">version for Kubernetes</a>. These distributions include all of the features of the open source version, with some additional management features. Support agreements are part of the commercial licensing.</p>
            <img src="/img/commercial/support-and-hosting-phone.svg" id='support-and-hosting-phone' />
            <h2>Support + Hosting</h2>
            <p>
              Pivotal Software provides <a href="https://pivotal.io/rabbitmq">support for open source RabbitMQ</a>, available for a subscription fee. The following companies provide technical support and/or cloud hosting of open source RabbitMQ: <a href="https://www.cloudamqp.com/">CloudAMQP</a>, <a href="https://www.erlang-solutions.com/products/rabbitmq.html">Erlang Solutions</a>, <a href="https://acemq.com/rabbitmq/">AceMQ</a>, <a href="http://www.visualintegrator.com/rmq/">Visual Integrator, Inc</a> and <a href="https://console.cloud.google.com/launcher/details/click-to-deploy-images/rabbitmq">Google Cloud Platform</a>. RabbitMQ can also be deployed in AWS and Microsoft Azure.
            </p>
            <img src="/img/commercial/testing-phone.svg" id='testing-phone' />
            <h2>Training</h2>
            <p>The following companies provide free, virtual, or instructor-led courses for RabbitMQ: <a href="https://academy.pivotal.io/store-catalog" target="_blank">Pivotal Software</a>, <a href="https://www.erlang-solutions.com/products/rabbitmq.html">Erlang Solutions</a>, <a href="http://www.visualintegrator.com/rmq/" target="_blank">Visual Integrator, Inc</a> and <a href="https://www.learnquest.com/course-detail-v3.aspx?cnum=rabbitmq-e1xc" target="_blank">LearnQuest</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class Community extends React.Component {
  render() {
    return (
      <div id='community' className='home-section-container'>
        <div className='home-section'>
          <div className='tiles'>
            <div className='tile'>
              <h1>Community</h1>
              <a className='btn btn-primary' href='https://groups.google.com/forum/#!forum/rabbitmq-users' target="_blank">Mailing List</a>
              <a className='btn btn-secondary' href='https://rabbitmq-slack.herokuapp.com/' target="_blank">Slack Channel</a>
              <p>Meet your fellow Rabbits to share stories, advice, and get help.</p>
              <h2>Issues &amp; Bug Reports</h2>
              <p>Start by searching the <a href="https://groups.google.com/forum/#!forum/rabbitmq-users" target="_blank">Mailing List</a> archive and known issues on <a href="https://github.com/rabbitmq?q=rabbitmq" target="_blank">Github</a>. It’s very likely fellow users have raised the same issue. </p>
              <h2>Contributions</h2>
              <p>RabbitMQ welcomes contributions from the community. Please see our <a href='/github.html'>Contributors Page</a> to learn more.</p>
            </div>
            <div className='tile'>
              <h1>Contact Us</h1>
              <h2>Commercial inquiries</h2>
              <p><a href='mailto:rabbitmq-sales@pivotal.io'>Pivotal Sales</a> | <a href='https://support.pivotal.io' target="_blank">Pivotal Support</a></p>
              <h2>Other inquiries</h2>
              <p><a href="/contact.html">Contact us</a></p>
              <h2>Report a security vulnerability</h2>
              <p><a href="mailto:security@rabbitmq.com">security@rabbitmq.com</a></p>
              <h2>Social media</h2>
              <p><a href='https://twitter.com/RabbitMQ' target="_blank">Twitter</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: config, language = ''} = this.props;

    return (
      <div id="homepage">
        <HomeHero config={config} language={language} />
        <Intro config={config} language={language} />
        <Features config={config} language={language} />
        <GetStarted config={config} language={language} />
        <Support config={config} language={language} />
        <Community config={config} language={language} />
      </div>
    );
  }
}

module.exports = Index;
