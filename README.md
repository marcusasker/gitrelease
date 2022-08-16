# trainee-release-with-git

This is the trainee course material for the session "Release with Git" which
aims to build upon the course [Version Control With Git](https://github.com/Lundalogik/version-control-with-git).

The slides for this course can be found at <a href="file:///F|/Common/Training/Trainee/Trainee 2022/Trainee 2022 - reunion Q3 (start in Q1)/Sessions/2022-08-10 (SE) Releasing software with Git (JOA)">
  F:/Common/Training/Trainee/Trainee 2022/Trainee 2022 - reunion Q3 (start in Q1)/Sessions/2022-08-10 (SE) Releasing software with Git (JOA)
</a>

The exercises of this course touches these topics:

* Conventional Commits
* Semantic Release
* GitHub Actions Workflows
* Automated releases on GitHub
* Working with Pre-Releases
* Cherry-picking and resolving conflicts
* Fixup commits and interactive rebasing

# Setting up the environment

1. Copy this repository to your personal GitHub account using the [Import repository](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/importing-a-repository-with-github-importer) feature on GitHub. _Important: Don't fork the repository and if you choose to make your imported repository private, you may need to add access for your trainer._
2. Go to your created repository on GitHub and then click Settings
3. Enable "all actions and reusable workflows" in the Actions -> General section
4. Go to the now visible Actions tab in your repository and enable GitHub Actions
5. Clone the repository created under your personal account

During this course you can use the tools you normally use to work with Git,
but it's recommended to use the Git CLI. Although tools like VSCode offer a GUI
to do commits and rebase operations, it does not currently allow the user to
make fixup commits.

Once you're done, pop over to [the exercises](exercises.md) and let the fun
begin!

# More info / resources

* [Semantic Release: Release Workflows](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow)
* [Git Rebase: Git In Practice](https://www.thinktecture.com/en/tools/demystifying-git-rebase)
* [Video: VSCode GitLens Interactive Rebase UI](https://www.youtube.com/watch?v=P5p71fguFNI)
