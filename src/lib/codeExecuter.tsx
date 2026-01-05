'use client'

export function executeCode(code: string, testCase: { input: string, expectedOutput: string }): {
  passed: boolean
  actualOutput: string
  error?: string
} {
  try {
    // Create a safe function context
    const func = new Function('input', `
      ${code}
      
      // Parse input
      const parsedInput = ${testCase.input};
      
      // Find the function name from code
      const funcMatch = code.match(/function\\s+(\\w+)/);
      if (!funcMatch) return "Error: No function found";
      
      const funcName = funcMatch[1];
      
      // Execute based on function signature
      try {
        if (Array.isArray(parsedInput)) {
          return eval(funcName + '(...parsedInput)');
        } else {
          return eval(funcName + '(parsedInput)');
        }
      } catch (e) {
        return "Runtime Error: " + e.message;
      }
    `)
    
    const result = func(testCase.input)
    const actualOutput = JSON.stringify(result)
    const expectedOutput = testCase.expectedOutput
    
    // Basic comparison
    const passed = actualOutput === expectedOutput || 
                   String(result) === expectedOutput ||
                   result === expectedOutput
    
    return {
      passed,
      actualOutput: String(result),
      error: passed ? undefined : 'Output does not match expected result'
    }
  } catch (error: any) {
    return {
      passed: false,
      actualOutput: 'Error',
      error: `Runtime Error: ${error.message}`
    }
  }
}