const test = require('tape')
import Manson from '../src/manson'

test('available log levels', t=> {

  t.assert(Manson.OFF !== undefined,   'has an off level')
  t.assert(Manson.DEBUG !== undefined, 'has a debug level')
  t.assert(Manson.INFO !== undefined,  'has a info level')
  t.assert(Manson.WARN !== undefined,  'has a warn level')
  t.assert(Manson.ERROR !== undefined, 'has a debug level')
  t.assert(Manson.TRACE !== undefined, 'has a trace level')

  t.notOk(Manson.level, 'defaults to no level set')
  Manson.setup()
  t.equals(Manson.level, Manson.DEBUG, 'calling default sets level to debug by default')

  Manson.level = Manson.INFO
  t.equals(Manson.level, Manson.INFO, 'we can just set the level as well')

  t.equals('OFF',    Manson.labelFor(-1) , 'got off label')
  t.equals('DEBUG',  Manson.labelFor(0),   'got debug label')
  t.equals('INFO',   Manson.labelFor(1),   'got info label')
  t.equals('WARN',   Manson.labelFor(2),   'got warn label')
  t.equals('ERROR',  Manson.labelFor(3),   'got error label')
  t.equals('TRACE',  Manson.labelFor(4),   'got trace label')

  t.end()
})

test('that we can create a log handler', t => {
  t.plan(2)
  t.timeoutAfter(1000)

  Manson.setup()

  const expectedMsg   = 'Debug Log Message'
  const expectedLevel = Manson.DEBUG

  Manson.handler = (msg, context) => {
    t.equals(msg, expectedMsg,             'got the expected message')
    t.equals(context.level, expectedLevel, 'got the expected level')
  }

  Manson.debug(expectedMsg)
  Manson.info('should not get this')

})

test('show some output', t=> {
  Manson.setup()
  Manson.level = Manson.TRACE

  Manson.debug('Debug message')
  Manson.info('Info message')
  Manson.warn('Warn message')
  Manson.error('Error message')
  Manson.trace('Trace message')

  t.end()
})
