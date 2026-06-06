import { existsSync, readdirSync } from 'node:fs'
import { delimiter, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const REQUIRED_JAVA_MAJOR = 21

function javaMajor(javaExecutable, environment) {
  const result = spawnSync(javaExecutable, ['-version'], {
    encoding: 'utf8',
    env: environment,
  })
  const output = `${result.stdout || ''}${result.stderr || ''}`
  const match = output.match(/version "(\d+)/)

  return match ? Number(match[1]) : 0
}

function javaCandidates() {
  const candidates = []

  if (process.env.JAVA_HOME) {
    candidates.push(process.env.JAVA_HOME)
  }

  if (process.platform !== 'win32') {
    return candidates
  }

  const roots = [
    'C:\\Program Files\\Eclipse Adoptium',
    'C:\\Program Files\\Microsoft',
    'C:\\Program Files\\Java',
  ]

  for (const root of roots) {
    if (!existsSync(root)) {
      continue
    }

    for (const directory of readdirSync(root)) {
      if (directory.toLowerCase().startsWith('jdk-21')) {
        candidates.push(join(root, directory))
      }
    }
  }

  return candidates
}

function environmentWithJava21() {
  const environment = { ...process.env }
  const executableName =
    process.platform === 'win32' ? 'java.exe' : 'java'

  if (javaMajor('java', environment) >= REQUIRED_JAVA_MAJOR) {
    return environment
  }

  for (const javaHome of javaCandidates()) {
    const javaExecutable = join(javaHome, 'bin', executableName)

    if (
      existsSync(javaExecutable) &&
      javaMajor(javaExecutable, environment) >= REQUIRED_JAVA_MAJOR
    ) {
      environment.JAVA_HOME = javaHome
      environment.PATH = `${join(javaHome, 'bin')}${delimiter}${
        environment.PATH || ''
      }`
      return environment
    }
  }

  console.error(
    'Firebase Emulator wymaga JDK 21 lub nowszego. Ustaw JAVA_HOME przed uruchomieniem skryptu.',
  )
  process.exit(1)
}

const mode = process.argv[2]
const firebaseCli = resolve(
  'node_modules/firebase-tools/lib/bin/firebase.js',
)
const commonArguments = [
  firebaseCli,
  mode === 'test' ? 'emulators:exec' : 'emulators:start',
  '--project',
  'demo-restauracja-smaku',
  '--only',
  mode === 'test' ? 'firestore' : 'auth,firestore',
]

if (mode === 'test') {
  commonArguments.push('vitest run --config vitest.rules.config.js')
} else if (mode !== 'start') {
  console.error('Użycie: firebase-emulators.mjs test|start')
  process.exit(1)
}

const result = spawnSync(process.execPath, commonArguments, {
  cwd: process.cwd(),
  env: environmentWithJava21(),
  stdio: 'inherit',
})

process.exit(result.status ?? 1)
