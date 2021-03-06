// Generated file (from: avg_pool_quant8_4.mod.py). Do not edit
describe('CTS', function() {
  const assert = chai.assert;
  const nn = navigator.ml.getNeuralNetworkContext();

  it('check result for Avg pool quant8 example/4', async function() {
    // For 'Avg pool quant8' example: examples
    let model = await nn.createModel(options);
    let operandIndex = 0;

    let op1_value = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let op3_expect = [0, 1, 2, 2, 2, 2, 2, 2, 2];

    let type0 = {type: nn.TENSOR_QUANT8_ASYMM, dimensions: [1, 3, 3, 1], scale: 0.5, zeroPoint: 0};
    let type0_length = product(type0.dimensions);
    let type1 = {type: nn.INT32};

    let op1 = operandIndex++;
    model.addOperand(type0);
    let pad0 = operandIndex++;
    model.addOperand(type1);
    let cons1 = operandIndex++;
    model.addOperand(type1);
    let relu1_activitation = operandIndex++;
    model.addOperand(type1);
    let op3 = operandIndex++;
    model.addOperand(type0);

    model.setOperandValue(pad0, new Int32Array([0]));
    model.setOperandValue(cons1, new Int32Array([1]));
    model.setOperandValue(relu1_activitation, new Int32Array([2]));
    model.addOperation(nn.AVERAGE_POOL_2D, [op1, pad0, pad0, pad0, pad0, cons1, cons1, cons1, cons1, relu1_activitation], [op3]);

    model.identifyInputsAndOutputs([op1], [op3]);
    await model.finish();

    let compilation = await model.createCompilation();
    compilation.setPreference(getPreferenceCode(options.prefer));
    await compilation.finish();

    let execution = await compilation.createExecution();

    let op1_input = new Uint8Array(op1_value);
    execution.setInput(0, op1_input);
    let op3_output = new Uint8Array(type0_length);
    execution.setOutput(0, op3_output);

    await execution.startCompute();

    for (let i = 0; i < type0_length; ++i) {
      assert.isTrue(almostEqualCTSQuant8(op3_output[i], op3_expect[i]));
    }
  });
});
