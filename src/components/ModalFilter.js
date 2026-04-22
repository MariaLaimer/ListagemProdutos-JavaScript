import { useState } from "react";
import { View, TouchableOpacity, Text, Modal, StyleSheet } from "react-native";
const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const ModalFilter = ({ visible, onClose, onFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleApply = () => {
    onFilter(selectedFilter);
    onClose();
  }

  return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Text style={styles.modalText}>Escolha a Categoria:</Text>

              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedFilter === category && styles.categoryButtonSelected
                  ]}
                  onPress={() => setSelectedFilter(category)}
                >
                  <Text>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                onPress={onClose}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleApply}
              >
                <Text style={styles.textStyle}>Aplicar Filtro</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  categoryButton: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    alignItems: "center",
  },
  categoryButtonSelected: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalFilter;