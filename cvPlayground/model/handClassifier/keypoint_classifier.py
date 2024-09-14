import numpy as np
import onnxruntime as ort

class KeyPointClassifier(object):
    def __init__(
        self,
        model_path='model/handClassifier/keypoint_classifier.onnx',
        num_threads=1,
    ):
        self.session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])
        self.input_name = self.session.get_inputs()[0].name
        self.output_name = self.session.get_outputs()[0].name

    def __call__(
        self,
        landmark_list,
    ):
        input_data = np.array([landmark_list], dtype=np.float32)
        result = self.session.run([self.output_name], {self.input_name: input_data})

        result_index = np.argmax(np.squeeze(result))

        return result_index
