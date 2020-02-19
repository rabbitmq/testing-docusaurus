// vim:sw=2:et:
/**
 * Copyright (c) 2020-present, Pivotal Software, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const BlogSidebar = require('../../core/BlogSidebar.js');
const Md = require(`${process.cwd()}/core/Md.js`);

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
    var blogSidebarConfig = this.props.config;
    blogSidebarConfig.blogSidebarTitle = {default: 'Updates'};
    blogSidebarConfig.blogSidebarCount = 5;

    return (
      <div id='intro'>
        <Md id='description'>
{`
# RabbitMQ is the most widely deployed open source message broker.

With tens of thousands of users, RabbitMQ is one of
the most popular open source message brokers. From
[T-Mobile](https://www.youtube.com/watch?v=1qcTu2QUtrU) to
[Runtastic](https://medium.com/@runtastic/messagebus-handling-dead-letters-in-rabbitmq-using-a-dead-letter-exchange-f070699b952b),
RabbitMQ is used worldwide at small startups and large enterprises.

RabbitMQ is lightweight and easy to deploy on premises and in the
cloud. It supports multiple messaging protocols. RabbitMQ can be
deployed in distributed and federated configurations to meet high-scale,
high-availability requirements.

RabbitMQ runs on many operating systems and cloud environments,
and provides a [wide range of developer tools for most popular
languages](/devtools.html).

See how other people are using RabbitMQ:

<div id="UfEmbeddedHub1501190831892"></div>
<script>window._ufHubConfig = window._ufHubConfig || [];window._ufHubConfig.push({'containers':{'app':'#UfEmbeddedHub1501190831892'},'collection':'453624','openLink':function(url){window.open(url);},'lazyloader':{'itemDisplayLimit':3,'maxTilesPerRow':3,'maxItemsTotal':3},'tileSize':'small','enablePageTracking':false,'baseUrl':'https://content.pivotal.io/','filesUrl':'https://content.cdntwrk.com/','generatedAtUTC':'2017-07-27 21:26:47'});</script>
<script>(function(d,t,u){function load(){var s=d.createElement(t);s.src=u;d.body.appendChild(s);}if(window.addEventListener){window.addEventListener('load',load,false);}else if(window.attachEvent){window.attachEvent('onload',load);}else{window.onload=load;}}(document,'script','https://content.pivotal.io/hubsFront/embed_collection'));</script>
<p id='morelinkafterufembed'><a href='https://content.pivotal.io/rabbitmq'>More <span className="link-arrow"></span></a></p>
`}
        </Md>
        <div id='news'>
          <div id='updates'>
            <BlogSidebar
              language="en"
              config={blogSidebarConfig}
            />
            <p><a href='/blog/'>More updates<span className='link-arrow'></span></a></p>
          </div>
          <div id='twitterfeed'>
            <h2>Tweets</h2>
            <a className="twitter-timeline" href="https://twitter.com/RabbitMQ" data-chrome="noheader nofooter noborders transparent noscrollbar" data-tweet-limit='2'></a>
            <script src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
            <p><a href='https://twitter.com/RabbitMQ'>More tweets<span className='link-arrow'></span></a></p>
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
            <Md className='tile'>
{`
![Asynchronous Messaging](/img/features/messaging.svg)

## Asynchronous Messaging

Supports [multiple messaging protocols](/protocols.html),
[message queuing](/tutorials/tutorial-two-python.html),
[delivery acknowledgement](/reliability.html),
[flexible routing to queues](/tutorials/tutorial-four-python.html),
[multiple exchange type](/tutorials/amqp-concepts.html).
`}
            </Md>
            <Md className='tile'>
{`
![Developer Experience](/img/features/monitor.svg)

## Developer Experience

Deploy with [BOSH, Chef, Docker and Puppet](/docs/install/). Develop
cross-language messaging with favorite programming languages such
as: Java, .NET, PHP, Python, JavaScript, Ruby, Go, [and many
others](/devtools.html).
`}
            </Md>
            <Md className='tile'>
{`
![Distributed Deployment](/img/features/network.svg)

## Distributed Deployment

Deploy as [clusters](/clustering.html) for high availability and
throughput; [federate](/federation.html) across multiple availability
zones and regions.
`}
            </Md>
            <Md className='tile'>
{`
![Enterprise & Cloud Ready](/img/features/clouds.svg)

## Enterprise &amp; Cloud Ready

Pluggable [authentication](/authentication.html),
[authorisation](/access-control.html) supports [TLS](/ssl.html) and
[LDAP](/ldap.html). Lightweight and easy to deploy in public and private
clouds.
`}
            </Md>
            <Md className='tile'>
{`
![Tools & Plugins](/img/features/tools.svg)

## Tools & Plugins

Diverse array of [tools and plugins](/devtools.html) supporting
continuous integration, operational metrics, and integration to other
enterprise systems. Flexible [plug-in approach](/plugins.html) for
extending RabbitMQ functionality.
`}
            </Md>
            <Md className='tile'>
{`
![Management & Monitoring](/img/features/gauge.svg)

## Management & Monitoring

HTTP-API, command line tool, and UI for [managing and
monitoring](/management.html) RabbitMQ.
`}
            </Md>
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
              <a className='btn btn-secondary' href='/docs/install/'>Download + Installation</a>
              <p>Servers and clients for popular operating systems and languages</p>
            </div>
            <div className='tile'>
              <a className='btn btn-primary' href='/docs/getting-started/'>RabbitMQ Tutorials</a>
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
          <Md id='commercial-items'>
{`
<img src="/img/commercial/commercial-distribution-phone.svg" id='commercial-distribution-phone' />

## Commercial Distribution

Pivotal Software offers a [range of commercial offerings for
RabbitMQ](https://pivotal.io/rabbitmq).
This includes a distribution called [Pivotal RabbitMQ](https://network.pivotal.io/products/pivotal-rabbitmq),
a version that deploys in [Pivotal Platform](https://pivotal.io/platform/services-marketplace/messaging-and-integration/rabbitmq),
and a forthcoming [version for Kubernetes](https://content.pivotal.io/blog/introducing-rabbitmq-for-kubernetes).
These distributions include all of the features of the open source
version, with some additional management features. Support agreements
are part of the commercial licensing.

<img src="/img/commercial/support-and-hosting-phone.svg" id='support-and-hosting-phone' />

## Support + Hosting

Pivotal Software provides [support for open source
RabbitMQ](https://pivotal.io/rabbitmq), available for a subscription
fee. The following companies provide technical support and/or cloud
hosting of open source RabbitMQ:
[CloudAMQP](https://www.cloudamqp.com/),
[Erlang Solutions](https://www.erlang-solutions.com/products/rabbitmq.html),
[AceMQ](https://acemq.com/rabbitmq/),
[Visual Integrator, Inc](http://www.visualintegrator.com/rmq/) and
[Google Cloud Platform](https://console.cloud.google.com/launcher/details/click-to-deploy-images/rabbitmq).
RabbitMQ can also be deployed in AWS and Microsoft Azure.

<img src="/img/commercial/testing-phone.svg" id='testing-phone' />

## Training

The following companies provide free, virtual, or instructor-led courses
for RabbitMQ:
[Pivotal Software](https://academy.pivotal.io/store-catalog),
[Erlang Solutions](https://www.erlang-solutions.com/products/rabbitmq.html),
[Visual Integrator, Inc](http://www.visualintegrator.com/rmq/) and
[LearnQuest](https://www.learnquest.com/course-detail-v3.aspx?cnum=rabbitmq-e1xc).
`}
          </Md>
          <div id=''>
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
            <Md className='tile'>
{`
# Community

<a class="btn btn-primary" href="https://groups.google.com/forum/#!forum/rabbitmq-users">Mailing List</a>
<a class="btn btn-secondary" href="https://rabbitmq-slack.herokuapp.com/">Slack Channel</a>

Meet your fellow Rabbits to share stories, advice, and get help.

## Issues & Bug Reports

Start by searching the [Mailing
List](https://groups.google.com/forum/#!forum/rabbitmq-users) archive
and known issues on [Github](https://github.com/rabbitmq?q=rabbitmq).
It’s very likely fellow users have raised the same issue.

## Contributions

RabbitMQ welcomes contributions from the community. Please see our
[Contributors Page](/github.html) to learn more.
`}
            </Md>
            <Md className='tile'>
{`
# Contact Us

## Commercial inquiries
[Pivotal Sales](mailto:rabbitmq-sales@pivotal.io) |
[Pivotal Support](https://support.pivotal.io)

## Other inquiries
[Contact us](/contact.html)

## Report a security vulnerability
[security@rabbitmq.com](mailto:security@rabbitmq.com)

## Social media
[YouTube](https://www.youtube.com/channel/UCSg9GRMGAo7euj3baJi4dOg) |
[Twitter](https://twitter.com/RabbitMQ)
`}
            </Md>
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
