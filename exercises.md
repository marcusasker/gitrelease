# Exercises

The exercises found here have a strong focus on the git commands involved in
releasing software with Semantic Release. Therefore, the actual application
built in the exercises are just a simple NodeJS Hello World application.
In real world scenarios, the plugins used with Semantic Release and the
situations that may arise during code reviews can be a bit more complex than the
scenarios found here. Nonetheless, completing the exercises should give you a
good enough introduction to the daily tasks of making pull requests and getting
code released with Git and Semantic Release.

## Exercise 1: Create a new release

In this exercise you will create a new release by merging a pull request to the
main branch. The release will be created automatically for us by using a
`on: push` trigger in GitHub Actions.
When the workflow runs it will as a last step print the new version number.

### Step 1: Examine the GitHub Actions workflow

Examine the workflow file [ci.yml](.github/workflows/ci.yml) in this repository.
It will run `npm install` and `npm test` and then use a pre-built action to
trigger `semantic-release`. When not using the pre-built action we would use the
command [`npx semantic-release`](https://semantic-release.gitbook.io/semantic-release/usage/installation) directly.

Now that you examined the workflow file and understand what will happen and when,
let's push some code!

### Step 2: Trigger the release build

On GitHub, go to the already existing branch `feat-hello-lime` and create a
Pull Request for it.
Next, click the arrow on the big green merge button and select
 **Rebase and merge** and click **Confirm rebase and merge**.

By rebasing the `feat` commit from the `feat-hello-lime` branch onto the `main`
branch, the workflow will run and create a release for us.
Let's check out how it went!

### Step 3: Examine the workflow run

Navigate to the Actions tab in your repository on GitHub. You should now see a
_workflow run_ titled **feat: limeify message**.
Click the workflow run and then the **Run Semantic Release** _job_ and expand
the **semantic release** _step_ to see the output from the Semantic Release tool.
Pay extra attention to the lines from the _commit analyzer_.
They should indicate that the commit with the message `feat: limeify message`
resulted in a minor release being created.

Did you run into trouble? Your workflow didn't run?
Then maybe you forgot to enable GitHub Actions for your repository.
Go back to the [README](README.md) for instructions.

When something is wrong with GitHub Actions or we forgot to prefix our commit
messages with `feat:` or `fix:` we can always push an empty commit to trigger a
new build.

1. Pull the latest changes from the main branch to your local clone
2. Push an empty `fix:` commit (to the main branch) to trigger a new build:

```
git commit --allow-empty -m "fix: trigger build"
git push
```

**Tip** If you push more commits before the build has completed you can get the
following message and no release is created:

"The local branch main is behind the remote one, therefore a new version won't be published."

If you end up in this situation, use an empty commit to trigger another build,
but don't push more commits to the branch until the build is completed!

### Step 4: Examine the release outputs

In this repository we have configured Semantic Release options to create
GitHub Releases and maintain a [`CHANGELOG.md`](CHANGELOG.md) file.
Other scenarios allow publishing the release bits to [npm](https://npmjs.com)
or similar package repositories.

Now go to the Releases of your GitHub repository and check out the newly created
release! You'll find a changelog for the release itself as well as the release
artifact with the source code we told Semantic Release to include in the output.

You're now done making your first release in this repository - nice work!

## Exercise 2: Making a pre-release

In the first exercise we published a release on what is called the default
channel. If we want to try out things without risking making our users on the
default channel unhappy we can create a pre-release. The GitHub Actions workflow
in this repository has been configured to create a pre-release when you push to
certain branches.

**Note:** These branches are meant to be used for pushing merges from your
feature branches only, you should not "work" in branches like `dev` and `beta`.

### Step 1: Trigger a pre-release build

In the branch `feat-1001-add-current-time` we've added a feature that makes the
program to print the current date and time. If you want to try it you can check
out that branch and run `npm install` and then `npm test`.
In order to get our new feature out on the _dev channel_ we need to trigger our
workflow by pushing the code to the `dev` branch. We do so by merging the
commits from our feature branch to the dev branch and resolve any conflicts with
the code from our feature branch.

1. Check out the `dev` branch
2. Merge the feature branch into dev using the command `git merge --strategy-option theirs origin/feat-1001-add-current-time`
3. `git push`

With our code on the `dev` branch, let's check out how the build goes!

### Step 2: Examine the pre-release build

After pushing commits to our `dev` branch, we have triggered our GitHub Actions
workflow. Click the Actions tab and see if you find a workflow run on the `dev`
branch! Now once again go to the repository Releases page and see if you can
find your first pre-release.
It should be marked with `-dev.1` in the name and labeled "Pre-release".

We have now created a release with our new feature that won't affect our users
on the default distribution channel!

**Tip:** You can read more about [distribution channels](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow/distribution-channels) in the Semantic Release documentation.

## Exercise: Working with interactive rebasing and fixup commits

At Lime, we strive for a clean `main` branch with only meaningful commits.
During pull request reviews, it's often necessary to add more commits based on
review comments.
To keep all changes that should go together in the desired commit, we can use
something called fixup commits. These will make it easy to squash the commits
together before merging to `main`, without the need of force pushing changes to
the branch under review.
Force pushing to the branch while it's under review is not a good thing because
it will make it harder for the reviewers to follow what changes you have made
and what's still left to do based on their comments.

**Note:** It's important to squash all fixup commits before merging to a shared
branch like main where want to avoid making force pushes

Let's start by finishing up an existing branch which has a fixup commit.

### Step 1: What a fixup commit looks like

1. Check out the `feat-1001-add-current-time` branch
2. Use `git log` to examine the branch commit history

You should now see something like this:

```
commit C (HEAD -> feat-1001-add-current-time, origin/feat-1001-add-current-time)
...
    fixup! feat: print current time

    correct typos

commit B

    docs: add readme and comments

commit A

    feat: print current time
```

The last commit (C) on this branch is a fixup commit which can be identified by
the prefix `fixup!`. It was created using the command
`git commit --fixup A -m "correct typos"`.
While it's not necessary to provide a commit message, it can sometime help to
provide an extra message during the review process. Afterall, these commits will
be squashed together with a single commit message, thus the extra message is
only used until we squash them.

### Step 2: Rebase the branch onto main

We now want to prepare the branch for merging into main and do so by using the
interactive rebase command with the option `--autosquash`. It will automatically
suggest squashing (fixup) of the fixup commits that exists on our branch.

With the changes made to the `main` branch in the first exercise, this branch
has conflicting changes in the index.js file. Except for squashing the fixup
commit in our branch, we also need to resolve these conflicts.
You will notice how the conflict need to be resolved for every commit as the
changes are re-applied in the rebase operation.

This branch also adds a README.md file and we want to remove that commit.
We will use the drop action in the interactive rebase to do that.

1. Start the interactive rebase with the command: `git rebase -i --autosquash main`
2. Drop the `docs:` commit by changing "pick" to "d" on that line (see below)
3. Let the rest of the lines be unchanged, save and exit
4. Resolve the conflict in index.js in your editor (see below)
5. Stage the modification using `git add index.js`
6. Continue the rebase with the command `git rebase --continue`
7. You now have a chance to change the commit message,
   but just let it be unchanged
8. When the rebase operation comes to the fixup commit, we will have another
   conflict. Let's resolve that too in your editor (see below)
9. Stage the modifications using `git add index.js`
10. Continue the rebase with the command `git rebase --continue`
11. The commit message editor now shows the final message for the squashed
   commit, let's save it as it is
12. The branch is now successfully rebased and updated


Annotations for the steps of the rebase operation:

Rebase editor content:

```
pick 12abf5d chore(release): 1.0.0 [skip ci]
pick 64404f3 feat: print current time
fixup 7a1ed7d fixup! feat: print current time
d fbde48d docs: add readme and comments
```

**Note:** Version number and/or commit hashes in the example will be different
in your repository.

First conflict resolution content for index.js:

```
console.log("Hello Lime!");
console.log(Date())
```

Second conflict resolution content for index.js:

```
// Prints hello lime and current time to the user
console.log("Hello Lime!");
console.log(new Date());
```

### Step 3: Push the rebased branch to GitHub

Whenever we rebase a branch it diverges from the remote branch and to be able to
push it to the remote we need to do so with force.

Use the following command to force push the branch to GitHub:

```
git push --force-with-lease
```

Verify that everything looks good in the branch on GitHub.
Now try yourself make a PR for the branch and merge it to main to get another
release out on the default distribution channel!
If you feel brave enough, why not try make a beta pre-release using the `beta`
branch? You can do it!