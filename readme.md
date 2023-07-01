# What is Penguin Alarm
The concept of penguin alarm is to provide your team a shared understanding of responsibilities as team members with an engaging backdrop of livestreams.  It lets your team members know what merge requests are open in gitlab, as well as what problems you may be experiencing in production.

# Running Penguin Alarm

## Method 1 - Penguin Hosted Config (Recommended)
This method is easier to use and taxes gitlab less.  Unless you have a compelling reason to do otherwise, please use this approach.

Go to [http://penguin.fi.cimpress.io/](http://penguin.fi.cimpress.io/) to set up your configuration - just type a new name in the configuration field to start.  

* If you'd like to use penguin alarm with new relic, refer to the [how to get a new relic api key](#newrelic).
* In order to see deployments, the ```sa_gitlab_morchsquad@cimpress.com``` user will need to be added as a member to your groups or projects.

Click your new configuration's name to take you to your new dashboard.


## Method 2 - Self Hosted Config
This method is not recommended, because it puts more pressure on gitlab than is necessary and is more difficult to set up.  However, it remains valid to use for backward compatibility, and more importantly, because it is available outside the VPN

To run penguin alarm, you only have to bring up a browser window at a url of the following format:

```
http://penguin.fi.cimpress.io/?gitLabToken=<personal gitlab token>&configUrl=<a path to your yaml file>&nrApiKey=<the new relic api key>
```

The gitlabToken and nrApiKey fields are not strictly required. Omitting the gitlab token will disable the merge request layer, and omitting the new relic api key will disable the new relic alerts.

### GitLab token
Penguin alarm requires a personal gitlab token to access information on your merge request status.  You can get one by following [these instructions](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html).

*Note:* Your personal access token is a powerful accessor (and modifier) of gitlab data, do not share it widely.

### New Relic API Key
<a name="newrelic"></a>The new relic api key can be found at [https://scrt.vistaprint.net/SecretView.aspx?secretid=18369](https://scrt.vistaprint.net/SecretView.aspx?secretid=18369).  For access, contact yetisupport@cimpress.com.

### The config url
Penguin alarm gets all your custom settings from a yaml file that it polls periodically (it will update your screen without page refreshes).  It expects the yaml file to look something like [the fulfiller integrati,on squad configuration](https://rawgit.com/daward/penguinconfig/master/config.yaml).  We recommend keeping your configuration on github, as that can be updated live, and does not require authentication that penguin alarm will not be able to navigate.

## Configuration

Valid query parameters:
* configUrl - Seems to be a remnant of the ability to load a config without adding it to penguin alarm's backend. Doesn't seem to do too much right now
* gitlabToken - used to be used for headless mode. Does not currently work

Environment Variables:
* 

# TODO:

* Finish fixing the react-selector API problems
  * Review changes in groupsearch and newrelicsearch, slideshow
  * fix multitile, commented out right now
* Actual configurability of:
    * Auth function, not just the "change what auth.js imports"
    * server url, not just "change what is set in constants.js"
    * some this.setupTokenRefresh() in appwithauth.jsx
* Get the headless option functional
* Completely identify all the configuration