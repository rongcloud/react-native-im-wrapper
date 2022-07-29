package cn.rongcloud.im.wrapper.rn.example;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

public  class MainActivity extends ReactActivity {
  static String[] PERMISSIONS = new String[]{Manifest.permission.READ_EXTERNAL_STORAGE};

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactNativeImExample";
  }


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    checkDangerousPermissions(PERMISSIONS);
  }


  public void checkDangerousPermissions(String[] permissions) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
      return;
    }
    for (String permission : permissions) {
      if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
        requestPermissions(permissions, 100);
      }
    }
  }
}
