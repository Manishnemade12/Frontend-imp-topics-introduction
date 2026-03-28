### Current Behavior
`mesheryctl system login` loads the active Meshery config through Viper, but if the current context does not already have a token entry, it creates that token in `utils.DefaultConfigPath` instead of the active config file.

This means a login flow started with `mesheryctl --config /tmp/staging.yaml system login` can still mutate the default meshconfig on disk when the token is missing.

### Expected Behavior
When login needs to create a missing token entry, it should write that token into the same config file already selected by the root command.

The active config loaded by Viper should remain the single source of truth for the login flow.

### Screenshots/Logs
Relevant code path:

```go
// mesheryctl/internal/cli/root/system/login.go
token, err := mctlCfg.GetTokenForContext(mctlCfg.GetCurrentContextName())
if err != nil {
	token.Location = utils.AuthConfigFile

	if err := config.AddTokenToConfig(token, utils.DefaultConfigPath); err != nil {
		log.Error("failed to find token path for the current context")
		return nil
	}
}
```

The root command already supports a selected config file:

```go
// mesheryctl/internal/cli/root/root.go
RootCmd.PersistentFlags().StringVar(&cfgFile, "config", utils.DefaultConfigPath, "path to config file")
```

### Environment

- **Host OS:** Mac Linux Windows
- **Platform:** Docker or Kubernetes
- **Meshery Server Version:** stable-v
- **Meshery Client Version:** stable-v

<!-- Optional 
### To Reproduce
1. Create a custom meshconfig file with a current context but without a token entry.
2. Run `mesheryctl --config /tmp/staging.yaml system login`.
3. Complete the login flow.
4. See the missing token added to the default config instead of `/tmp/staging.yaml`.
-->

---
### Contributor [Guides](https://docs.meshery.io/project/contributing) and [Handbook](https://meshery.io/community#handbook)
- 🛠 [Meshery Build & Release Strategy](https://docs.meshery.io/project/contributing/build-and-release)
- 📚 [Instructions for contributing to documentation](https://docs.meshery.io/project/contributing/contributing-docs)
   - Meshery documentation [site](https://docs.meshery.io/) and [source](https://github.com/meshery/meshery/tree/master/docs)
- 🎨 Wireframes and [designs for Meshery UI](https://www.figma.com/file/SMP3zxOjZztdOLtgN4dS2W/Meshery-UI) in Figma [(open invite)](https://www.figma.com/team_invite/redeem/GvB8SudhEOoq3JOvoLaoMs)
- 📺 [Self-paced Contributor Trainings](https://meshery.io/talks-and-trainings#trainings)
- 🙋🏾🙋🏼 Questions: [Discussion Forum](https://meshery.io/community#community-forums) and [Community Slack](https://slack.meshery.io)





----------------------------------------------------------------------------------------------------------------




### Current Behavior
`mesheryctl system reset` reads the current context from the active Viper config, but when it writes the reset context back to disk it always targets `utils.DefaultConfigPath`.

As a result, running reset against a custom config file can leave the selected config unchanged while rewriting the default meshconfig instead.

### Expected Behavior
`mesheryctl system reset` should rewrite the same meshconfig file that was selected through the global `--config` flag.

The command should not mix reads from the active config with writes to the default config path.

### Screenshots/Logs
Relevant code path:

```go
// mesheryctl/internal/cli/root/system/reset.go
defaultContext := utils.TemplateContext
defaultContext.Platform = currCtx.Platform
err = config.AddContextToConfig(
	mctlCfg.GetCurrentContextName(),
	defaultContext,
	utils.DefaultConfigPath,
	true,
	true,
)
```

The command reads the active config through Viper before this write:

```go
// mesheryctl/internal/cli/root/system/reset.go
mctlCfg, err := config.GetMesheryCtl(viper.GetViper())
```

### Environment

- **Host OS:** Mac Linux Windows
- **Platform:** Docker or Kubernetes
- **Meshery Server Version:** stable-v
- **Meshery Client Version:** stable-v

<!-- Optional 
### To Reproduce
1. Create a custom meshconfig file with a non-default context.
2. Run `mesheryctl --config /tmp/staging.yaml system reset`.
3. Confirm the prompt.
4. See the reset written to the default meshconfig instead of `/tmp/staging.yaml`.
-->

---
### Contributor [Guides](https://docs.meshery.io/project/contributing) and [Handbook](https://meshery.io/community#handbook)
- 🛠 [Meshery Build & Release Strategy](https://docs.meshery.io/project/contributing/build-and-release)
- 📚 [Instructions for contributing to documentation](https://docs.meshery.io/project/contributing/contributing-docs)
   - Meshery documentation [site](https://docs.meshery.io/) and [source](https://github.com/meshery/meshery/tree/master/docs)
- 🎨 Wireframes and [designs for Meshery UI](https://www.figma.com/file/SMP3zxOjZztdOLtgN4dS2W/Meshery-UI) in Figma [(open invite)](https://www.figma.com/team_invite/redeem/GvB8SudhEOoq3JOvoLaoMs)
- 📺 [Self-paced Contributor Trainings](https://meshery.io/talks-and-trainings#trainings)
- 🙋🏾🙋🏼 Questions: [Discussion Forum](https://meshery.io/community#community-forums) and [Community Slack](https://slack.meshery.io)












--------------------------------------------------------------------------------------------------------------------------------------------------------------------








### Current Behavior
When `mesheryctl version` detects an outdated or unreadable config file, the recovery path backs up and recreates `utils.DefaultConfigPath` even if the user explicitly selected a different config file with `--config`.

That makes the recovery flow operate on the wrong file and can leave the selected config broken while mutating the default one.

### Expected Behavior
If `mesheryctl version` is recovering a config file after startup validation fails, it should back up and recreate the config file that is currently in use.

The selected config path should be preserved through the full recovery flow.

### Screenshots/Logs
Relevant code path:

```go
// mesheryctl/internal/cli/root/version.go
if userResponse {
	utils.BackupConfigFile(utils.DefaultConfigPath)

	err = utils.CreateConfigFile()
	err = config.AddTokenToConfig(utils.TemplateToken, utils.DefaultConfigPath)
	err = config.AddContextToConfig("local", utils.TemplateContext, utils.DefaultConfigPath, true, false)
}
```

The command is initialized from the active Viper instance before reaching recovery:

```go
// mesheryctl/internal/cli/root/version.go
mctlCfg, err = config.GetMesheryCtl(viper.GetViper())
```

### Environment

- **Host OS:** Mac Linux Windows
- **Platform:** Docker or Kubernetes
- **Meshery Server Version:** stable-v
- **Meshery Client Version:** stable-v

<!-- Optional 
### To Reproduce
1. Create an invalid custom meshconfig file.
2. Run `mesheryctl --config /tmp/bad-config.yaml version`.
3. Accept the config regeneration prompt.
4. See the default meshconfig backed up and recreated instead of `/tmp/bad-config.yaml`.
-->

---
### Contributor [Guides](https://docs.meshery.io/project/contributing) and [Handbook](https://meshery.io/community#handbook)
- 🛠 [Meshery Build & Release Strategy](https://docs.meshery.io/project/contributing/build-and-release)
- 📚 [Instructions for contributing to documentation](https://docs.meshery.io/project/contributing/contributing-docs)
   - Meshery documentation [site](https://docs.meshery.io/) and [source](https://github.com/meshery/meshery/tree/master/docs)
- 🎨 Wireframes and [designs for Meshery UI](https://www.figma.com/file/SMP3zxOjZztdOLtgN4dS2W/Meshery-UI) in Figma [(open invite)](https://www.figma.com/team_invite/redeem/GvB8SudhEOoq3JOvoLaoMs)
- 📺 [Self-paced Contributor Trainings](https://meshery.io/talks-and-trainings#trainings)
- 🙋🏾🙋🏼 Questions: [Discussion Forum](https://meshery.io/community#community-forums) and [Community Slack](https://slack.meshery.io)
