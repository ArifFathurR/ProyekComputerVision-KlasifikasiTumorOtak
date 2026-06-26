import sys
from unittest.mock import MagicMock

class MockModule(MagicMock):
    @classmethod
    def __getattr__(cls, name):
        return MagicMock()

# Mock problematic Windows imports and submodules
sys.modules['tensorflow_decision_forests'] = MockModule()
sys.modules['jax'] = MockModule()
sys.modules['jax.experimental'] = MockModule()
sys.modules['jax.experimental.jax2tf'] = MockModule()
sys.modules['jaxlib'] = MockModule()
sys.modules['tensorflow_hub'] = MockModule()

import tensorflow as tf
import tensorflowjs as tfjs

print("Converting SavedModel to tfjs format...")
tfjs.converters.convert_tf_saved_model('backend/saved_model_tfjs', 'frontend/public/tfjs_model')
print("Conversion complete!")
