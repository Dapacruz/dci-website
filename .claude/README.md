# Claude Code Integration

This directory contains custom commands and specialized agents for [Claude Code](https://claude.ai/code) to enhance the development workflow for the DC Infrastructures website.

## Table of Contents

- [Overview](#overview)
- [Custom Commands](#custom-commands)
- [Specialized Agents](#specialized-agents)
- [Usage Examples](#usage-examples)
- [Creating Custom Commands](#creating-custom-commands)
- [Creating Custom Agents](#creating-custom-agents)

## Overview

Claude Code can be extended with:

- **Custom Commands** (`commands/`) - Slash commands that execute specific workflows
- **Specialized Agents** (`agents/`) - AI agents optimized for particular tasks

These tools work together to automate common development tasks, ensure quality, and maintain documentation.

## Custom Commands

### `/prime`

**Purpose:** Get Claude up to speed on the project state

**What it does:**
1. Examines project structure using `tre`
2. Reads `CLAUDE.md` for project guidelines
3. Reads `README.md` for project overview
4. Scans key files in `src/` directory
5. Provides a comprehensive summary of:
   - Project structure
   - Purpose and goals
   - Key files and their roles
   - Important dependencies
   - Configuration files

**When to use:**
- Starting a new session with Claude Code
- After being away from the project
- When onboarding new team members
- Before making significant changes

**Example:**
```bash
/prime
```

**Output:** Detailed project summary explaining architecture, tech stack, and current state.

---

### `/generate-prp`

**Purpose:** Generate a Project Requirement Plan for complex features

**What it does:**
1. Analyzes the feature request
2. Breaks down requirements into specific tasks
3. Identifies affected files and components
4. Creates a detailed implementation plan
5. Defines testing requirements
6. Outlines documentation needs

**When to use:**
- Planning new features
- Before starting complex refactoring
- When requirements are unclear
- For features requiring multiple steps

**Example:**
```bash
/generate-prp "Add a blog section with individual post pages"
```

**Output:** Structured PRP document with:
- Feature overview
- Task breakdown
- File changes needed
- Testing strategy
- Documentation updates
- Timeline estimate

---

### `/execute-prp`

**Purpose:** Execute a previously generated Project Requirement Plan

**What it does:**
1. Reads the PRP document
2. Creates todo list from PRP tasks
3. Implements changes step by step
4. Runs validation gates after each step
5. Updates documentation automatically
6. Generates final summary

**When to use:**
- After generating a PRP
- When ready to implement planned features
- For systematic feature development

**Example:**
```bash
# First generate the plan
/generate-prp "Add testimonials section"

# Then execute it
/execute-prp
```

**Output:**
- Implemented feature
- Passing tests
- Updated documentation
- Summary of changes

---

### `/prep-parallel-execution`

**Purpose:** Setup parallel git worktrees for concurrent development

**What it does:**
1. Creates separate git worktrees
2. Sets up isolated development environments
3. Configures each worktree for independent work
4. Provides commands to switch between worktrees

**When to use:**
- Working on multiple features simultaneously
- Testing different approaches
- Maintaining hotfix and feature branches
- Team parallel development

**Example:**
```bash
/prep-parallel-execution
```

**Output:**
- Multiple worktrees created
- Instructions for working in each
- Commands to merge work back

---

### `/fix-github-issue`

**Purpose:** Automated GitHub issue resolution workflow

**What it does:**
1. Fetches issue details from GitHub
2. Analyzes the problem
3. Searches codebase for relevant files
4. Implements a fix
5. Writes/updates tests
6. Creates a pull request

**When to use:**
- Fixing reported bugs
- Implementing feature requests from issues
- Systematic issue triaging

**Example:**
```bash
/fix-github-issue 42
```

**Output:**
- Fix implemented
- Tests added/updated
- Pull request created
- Issue linked to PR

---

## Specialized Agents

### `@documentation-manager`

**Purpose:** Maintain comprehensive, up-to-date documentation

**Capabilities:**
- Detects when code changes affect documentation
- Updates README.md, CLAUDE.md, and other docs
- Ensures consistency across documentation files
- Adds examples for new features
- Creates migration guides for breaking changes

**When called:**
- Automatically after code changes (proactive)
- Manually when you want docs reviewed
- Before pull requests
- After major refactoring

**How to use:**
```bash
# After making changes
@documentation-manager Review and update documentation for my recent changes to the contact form
```

**What it checks:**
- README.md accuracy
- CLAUDE.md completeness
- Code examples validity
- Setup instruction accuracy
- Dependency list updates

---

### `@validation-gates`

**Purpose:** Ensure code quality through comprehensive testing

**Capabilities:**
- Runs all test suites
- Executes linting checks
- Validates TypeScript types
- Performs build verification
- Iterates on fixes until all tests pass

**When called:**
- Automatically after implementations (proactive)
- Before committing code
- Before creating pull requests
- After major changes

**How to use:**
```bash
# Before committing
@validation-gates Validate all my changes to the services section
```

**Validation checklist:**
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] TypeScript compilation clean
- [ ] No console errors
- [ ] Responsive design works
- [ ] Manual testing checklist completed

---

## Usage Examples

### Example 1: Adding a New Feature

```bash
# 1. Prime Claude with context
/prime

# 2. Generate a plan
/generate-prp "Add customer testimonials carousel"

# 3. Review the plan, then execute
/execute-prp

# 4. Validation runs automatically via @validation-gates
# 5. Documentation updated automatically via @documentation-manager

# 6. Manual verification
npm run dev
# Test the feature in browser

# 7. Create PR
git add .
git commit -m "feat: add testimonials carousel"
git push
```

### Example 2: Fixing a Bug

```bash
# Option A: Automated fix
/fix-github-issue 123

# Option B: Manual fix with validation
/prime
# Make your changes...
@validation-gates Validate my bug fix for mobile menu
@documentation-manager Update troubleshooting guide if needed
```

### Example 3: Parallel Feature Development

```bash
# Setup parallel worktrees
/prep-parallel-execution

# In worktree 1: Work on feature A
cd ../dci-website-feature-a
/generate-prp "Add blog section"
/execute-prp

# In worktree 2: Work on feature B
cd ../dci-website-feature-b
/generate-prp "Add search functionality"
/execute-prp

# Merge both when ready
```

### Example 4: Documentation Review

```bash
# After making several changes
@documentation-manager Review all documentation for completeness and accuracy

# After the review, address any gaps
@documentation-manager Create ARCHITECTURE.md document explaining system design
```

### Example 5: Pre-commit Validation

```bash
# Before committing
npm run lint
npm run build

# Additional validation via agent
@validation-gates Run comprehensive validation before I commit

# If any issues found, agent will:
# 1. Report the issues
# 2. Suggest fixes
# 3. Apply fixes if requested
# 4. Re-run validation
# 5. Confirm when everything passes
```

---

## Creating Custom Commands

### Command File Format

Create a new `.md` file in `.claude/commands/`:

```markdown
# Command Name

Brief description of what this command does.

## Steps

1. First step
2. Second step
3. Third step

## Example

Example usage of the command
```

### Command Best Practices

1. **Be specific** - Clear, actionable instructions
2. **Include context** - Explain what files to read
3. **Define output** - Specify what Claude should return
4. **Add examples** - Show expected usage patterns
5. **Keep focused** - One command, one purpose

### Example Custom Command

Create `.claude/commands/update-deps.md`:

```markdown
# Update Dependencies

Check for outdated npm packages and update them safely.

## Steps

1. Run `npm outdated` to see outdated packages
2. Check CHANGELOG or GitHub releases for breaking changes
3. Update packages one at a time
4. Run tests after each update
5. Document any breaking changes in CLAUDE.md

## Safety Checks

- Always test after updating
- Never update all packages at once
- Check for peer dependency conflicts
- Verify build still works

## Output

Provide a summary of:
- What was updated
- Why it was safe to update
- Any configuration changes needed
- Test results
```

Usage: `/update-deps`

---

## Creating Custom Agents

### Agent File Format

Create a new `.md` file in `.claude/agents/`:

```markdown
---
name: agent-name
description: "Brief description of what this agent does and when to use it"
tools: Tool1, Tool2, Tool3
---

Detailed instructions for the agent...
```

### Agent Best Practices

1. **Single responsibility** - One agent, one domain
2. **Clear tools** - Only include necessary tools
3. **Proactive behavior** - Define when agent should act automatically
4. **Quality standards** - Define what "done" means
5. **Iterative process** - Agent should loop until success

### Example Custom Agent

Create `.claude/agents/accessibility-checker.md`:

```markdown
---
name: accessibility-checker
description: "Ensures website meets WCAG 2.1 AA accessibility standards. Proactively checks after UI changes."
tools: Read, Bash, Grep, Glob
---

You are an accessibility specialist ensuring the website meets WCAG 2.1 AA standards.

## Core Responsibilities

1. Check semantic HTML usage
2. Verify ARIA labels are correct
3. Test keyboard navigation
4. Validate color contrast ratios
5. Check focus indicators
6. Test screen reader compatibility

## Validation Process

1. Scan all UI components
2. Check each criterion:
   - Perceivable
   - Operable
   - Understandable
   - Robust
3. Report violations
4. Suggest fixes
5. Verify fixes work

## Tools to Use

- Run Lighthouse accessibility audit
- Check with axe-core
- Verify keyboard navigation manually
- Test color contrast

Remember: Accessibility is not optional. Every user deserves equal access.
```

Usage: `@accessibility-checker Check all components for WCAG compliance`

---

## Tips for Effective Use

### 1. Chain Commands

```bash
# Generate and execute in sequence
/generate-prp "feature" && /execute-prp
```

### 2. Use Agents Proactively

Don't wait for failures - call agents during development:

```bash
# After making changes
@validation-gates
@documentation-manager
```

### 3. Combine with Git Workflow

```bash
# Before creating PR
@validation-gates
@documentation-manager
git add .
git commit -m "feat: ..."
git push
```

### 4. Prime at Session Start

Always start with `/prime` when:
- Beginning a new session
- Returning after time away
- Context feels unclear

### 5. Use PRPs for Complex Work

Don't dive into complex features directly:

```bash
# Good: Plan first
/generate-prp "complex feature"
# Review plan
/execute-prp

# Less ideal: Start coding without plan
```

---

## Advanced Workflows

### PRP-Driven Development

1. **Generate PRP** for any non-trivial feature
2. **Review and refine** the plan
3. **Execute PRP** systematically
4. **Validation agent** ensures quality
5. **Documentation agent** keeps docs current
6. **Commit and PR** with confidence

### Parallel Feature Development

1. **Setup worktrees** with `/prep-parallel-execution`
2. **Work independently** in each worktree
3. **Validate independently** in each
4. **Merge systematically** when ready

### Issue-Driven Development

1. **Label issues** appropriately on GitHub
2. **Use `/fix-github-issue`** for systematic resolution
3. **Auto-generates PR** with fix and tests
4. **Review and merge** the auto-generated PR

---

## Troubleshooting Custom Commands

### Command Not Found

```bash
# Check command file exists
ls .claude/commands/

# Check filename matches command
# /my-command requires my-command.md
```

### Agent Not Responding

```bash
# Check agent file exists
ls .claude/agents/

# Verify frontmatter format
# Must have name, description, tools
```

### Command Doing Wrong Thing

1. Read the command file
2. Check if instructions are clear
3. Update instructions
4. Try again

---

## Contributing New Commands/Agents

1. **Test thoroughly** before committing
2. **Document well** - future you will thank you
3. **Follow patterns** - look at existing commands
4. **Add to this README** - keep documentation current
5. **Share learnings** - what worked, what didn't

---

## Resources

- [Claude Code Documentation](https://docs.claude.com/claude-code)
- [Project README](../README.md)
- [Claude Code Instructions](../CLAUDE.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Troubleshooting Guide](../TROUBLESHOOTING.md)

---

**Remember:** These tools are here to help you be more productive. Use them liberally, create new ones when needed, and iterate on them to make your workflow more efficient!
