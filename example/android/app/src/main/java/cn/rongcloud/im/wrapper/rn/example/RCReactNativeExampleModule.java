package cn.rongcloud.im.wrapper.rn.example;

import android.content.Context;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class RCReactNativeExampleModule extends ReactContextBaseJavaModule {
  private final Context context;


  public RCReactNativeExampleModule(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }


  @NonNull
  @Override
  public String getName() {
    return "ExampleIM";
  }

  //Promise promise
  @ReactMethod
  public void showToast(String message) {
    Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
  }


}
