import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const AccountSecurityScreen = ({ navigation }) => {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Security</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Deactivate Account Option */}
      <TouchableOpacity 
        style={styles.optionRow}
        onPress={() => setShowDeactivateModal(true)}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="person-remove-outline" size={22} color={Colors.text} />
          <Text style={styles.optionText}>Deactivate account</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      </TouchableOpacity>

      {/* Deactivate Account Modal */}
      <Modal
        visible={showDeactivateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeactivateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deactivate account</Text>
            
            <Text style={styles.modalDescription}>
              After deleting your account, all created content and chat history associated with this account will be permanently lost.
            </Text>
            
            <Text style={styles.modalDescription}>
              Account deletion is not the same as logging out.
            </Text>
            
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setConfirmDeletion(!confirmDeletion)}
            >
              <View style={[styles.checkbox, confirmDeletion && styles.checkboxActive]}>
                {confirmDeletion && (
                  <View style={styles.checkboxInner} />
                )}
              </View>
              <Text style={styles.checkboxText}>I confirm account deletion.</Text>
            </TouchableOpacity>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[
                  styles.modalButton, 
                  styles.deleteButton,
                  !confirmDeletion && styles.deleteButtonDisabled
                ]}
                disabled={!confirmDeletion}
                onPress={() => {
                  Alert.alert(
                    'Account Deletion',
                    'Your account will be permanently deleted. This action cannot be undone.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', style: 'destructive' }
                    ]
                  );
                }}
              >
                <Text style={[
                  styles.modalButtonText, 
                  styles.deleteButtonText,
                  !confirmDeletion && styles.deleteButtonTextDisabled
                ]}>
                  Delete
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowDeactivateModal(false);
                  setConfirmDeletion(false);
                }}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.surfaceLight,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    borderColor: Colors.text,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.text,
  },
  checkboxText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#3A3A4A',
  },
  cancelButton: {
    backgroundColor: Colors.text,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: Colors.textSecondary,
  },
  deleteButtonDisabled: {
    opacity: 0.5,
  },
  deleteButtonTextDisabled: {
    color: Colors.textSecondary,
  },
  cancelButtonText: {
    color: Colors.background,
  },
});

export default AccountSecurityScreen;