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
* REACT_APP_PENGUIN_HOST - the host for the backend. npm start will set this to localhost:8080
* REACT_APP_CLIENT_ID - the client id for your application to use for OIDC
* REACT_APP_AUTHORITY - the OIDC provider url
* For each possible git provider (GITLAB, GITHUB, BITBUCKET) - (Only gitlab is *actually* supported by the backend at this point)
    * REACT_APP_${PROVIDER}_CLIENT_ID - the client id for you application to use for Oauth with the git provider
    * REACT_APP_${PROVIDER}_AUTHORITY - the OAuth provider url for the git provider

Note: the required ones have placeholders in .env. The optional ones don't. You can set yours in .env.development.local (ignored by git)

# TODO:

P0

* Get the publish in a state it can be used but configured. So probably as a package, not a distributable

P1

* Put signin in menu
* Get the headless option functional
* Completely identify all the configuration
* Some package upgrades. Seems like some of the react helpers don't allow react 18, so we can't upgrade node in the build. react-scripts (create-react-app) is no longer reccommended, might need to swap this to get nodejs upgraded too
* Get user preferences to display, not just save. Boxes they are entered in never show state from the server